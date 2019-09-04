namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common

type IUserStatusWorkflow =
    abstract member GetUserStatusAsync: user: string -> Async<UserStatus>
    abstract member CheckWriteAccess: user: string -> Async<Result<unit,string>>
    abstract member CheckReadAccess: user: string -> Async<Result<unit,string>>

module Workflow = 
    let getUserStatusAsync (repository: IPaymentRepository) (dateTimeProvider: IDateTimeProvider) user = async {
        let! b = async {
            let! bSeq = repository.GetPaymentsAsync(user) |> Async.AwaitTask
            return bSeq |> Seq.tryLast
        }

        let dt = dateTimeProvider.GetCurrentDateTime()
        match b with 
        | None -> return UserStatus.New, dt
        | Some p -> 
            if p.Amount = 0m then
                if p.PayedUntil >= dt then
                    return UserStatus.Trial, p.PayedUntil
                else
                    return UserStatus.TrialExpired, p.PayedUntil
            else
                if p.PayedUntil >= dt then
                    return UserStatus.Paying, p.PayedUntil
                else
                    return UserStatus.Expired, p.PayedUntil
    }

type UserStatusWorkflow'(dateTimeProvider: IDateTimeProvider, getUserStatusAsync: string -> Async<UserStatus*System.DateTime>) =
    interface IUserStatusWorkflow with
        member __.GetUserStatusAsync user = async {
            let! s = getUserStatusAsync user
            return s |> fst
        }

        member __.CheckWriteAccess user = async {
            let! status = user |> getUserStatusAsync
            match status with
            | UserStatus.New, _
            | UserStatus.Expired, _
            | UserStatus.TrialExpired, _ 
                -> return Error "You do not have write status"
            | UserStatus.Trial, _
            | UserStatus.Paying, _ 
                -> return Ok ()
            | s -> return failwith (sprintf "Unrecognized status %A" s)
        }

        member __.CheckReadAccess user = async {
            match! user |> getUserStatusAsync with
            | UserStatus.New, _
                -> return Error "You do not have read status"
            | UserStatus.Expired, expiryDate 
            | UserStatus.TrialExpired, expiryDate                     
                -> 
                    if expiryDate.AddDays(30.) > dateTimeProvider.GetCurrentDateTime() then
                        return Ok ()
                    else
                        return Error "You do not have read status"                    
            | UserStatus.Trial, _
            | UserStatus.Paying, _ -> return Ok ()
            | s -> return failwith (sprintf "Unrecognized status %A" s)
        }

type UserStatusWorkflow(repository: IPaymentRepository, dateTimeProvider: IDateTimeProvider) = 
    inherit UserStatusWorkflow'(dateTimeProvider, Workflow.getUserStatusAsync repository dateTimeProvider)
