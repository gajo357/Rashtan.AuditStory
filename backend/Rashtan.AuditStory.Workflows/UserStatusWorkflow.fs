namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Dto
open System.Threading.Tasks

type IUserStatusWorkflow =
    abstract member GetUserStatusAsync: user: string -> Task<CsResult<PaymentStatus>>
    abstract member CheckWriteAccess: user: string -> AsyncResult<unit,string>
    abstract member CheckReadAccess: user: string -> AsyncResult<unit,string>

module Workflow = 
    let endDate (payment: PaymentProcessed) = 
        payment.PayedAt.AddMonths(payment.ItemNumber).AddDays(1.) 

    let getUserStatusAsync (repository: IPaymentRepository) (dateTimeProvider: IDateTimeProvider) user = async {
        let! b = async {
            let! bSeq = repository.GetPaymentsAsync(user) |> Async.AwaitTask
            return bSeq |> Seq.tryLast
        }

        let dt = dateTimeProvider.GetCurrentDateTime()
        match b with 
        | None -> return PaymentStatus.New, dt
        | Some p ->
            let endDate = endDate p
            if endDate >= dt then
                return PaymentStatus.Paying, endDate
            else
                return PaymentStatus.Expired, endDate
    }

type UserStatusWorkflow'(dateTimeProvider: IDateTimeProvider, getUserStatusAsync: string -> Async<PaymentStatus*System.DateTime>) =
    interface IUserStatusWorkflow with
        member __.GetUserStatusAsync user = 
            async {
                let! s = getUserStatusAsync user
                return s |> fst |> Ok
            } |> CsResult.fromAsyncResult

        member __.CheckWriteAccess user = async {
            let! status = user |> getUserStatusAsync
            match status with
            | PaymentStatus.New, _
            | PaymentStatus.Expired, _
                -> return Error "You do not have write status"
            | PaymentStatus.Paying, _ 
                -> return Ok ()
            | s -> return failwith (sprintf "Unrecognized status %A" s)
        }

        member __.CheckReadAccess user = async {
            match! user |> getUserStatusAsync with
            | PaymentStatus.New, _
                -> return Error "You do not have read status"
            | PaymentStatus.Expired, expiryDate                  
                -> 
                    if expiryDate.AddDays(30.) > dateTimeProvider.GetCurrentDateTime() then
                        return Ok ()
                    else
                        return Error "You do not have read status"  
            | PaymentStatus.Paying, _ -> return Ok ()
            | s -> return failwith (sprintf "Unrecognized status %A" s)
        }

type UserStatusWorkflow(repository: IPaymentRepository, dateTimeProvider: IDateTimeProvider) = 
    inherit UserStatusWorkflow'(dateTimeProvider, Workflow.getUserStatusAsync repository dateTimeProvider)