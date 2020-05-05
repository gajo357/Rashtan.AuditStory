namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.Common

type PaymentWorkflow(repository: IPaymentRepository, statusWorkflow: IUserStatusWorkflow) =

    member __.GetPaymentsAsync(user) = 
        asyncResult {
            do! statusWorkflow.CheckReadAccess user
            let! b = repository.GetPaymentsAsync(user) |> Async.AwaitTask
            return b
        } |> CsResult.fromAsyncResult