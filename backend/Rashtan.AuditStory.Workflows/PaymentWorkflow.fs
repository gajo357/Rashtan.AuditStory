namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.DbModel
open Rashtan.AuditStory.DtoValidation.PaymentValidator
open Rashtan.AuditStory.DtoDbMapper.PaymentMapper
open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Payment

type PaymentWorkflow(repository: IPaymentRepository, paymentGizmo: IPaymentGizmo, statusWorkflow: IUserStatusWorkflow, dateTimeProvider: IDateTimeProvider) =   
    member __.GenerateTokenAsync() = paymentGizmo.GenerateNonceAsync() |> Async.StartAsTask

    member __.SavePaymentAsync(user, dto) = 
        asyncResult {
            do! statusWorkflow.CheckWriteAccess user
            do! validatedToProcess dto
            let! processed = paymentGizmo.SaleAsync(dto)
            let db = toDb processed
            do! repository.SavePaymentAsync(user, db) |> Async.AwaitTask
            return processed
        } |> CsResult.fromAsyncResult

    member __.GetPaymentsAsync(user) = 
        asyncResult {
            do! statusWorkflow.CheckReadAccess user
            let! b = repository.GetPaymentsAsync(user) |> Async.AwaitTask
            return b |> Seq.map toDto
        } |> CsResult.fromAsyncResult
    
    member __.StartFreeTrialAsync user = 
        asyncResult {
            match! statusWorkflow.GetUserStatusAsync user with
            | UserStatus.New
                -> 
                    let db = Payment.createFreeTrial(dateTimeProvider.GetCurrentDateTime())
                    do! repository.SavePaymentAsync(user, db) |> Async.AwaitTask
                    return toDto db
            | _ -> return! Error "You have already used your free trial" |> AsyncResult.liftAsync
        } |> CsResult.fromAsyncResult
    

