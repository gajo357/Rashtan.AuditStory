namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.Common

type ChecklistWorkflow(repository: IChecklistRepository) = 
    member __.GetChecklistItemsAsync() = 
        asyncResult {
           let! countries = repository.GetChecklistItemsAsync() |> Async.AwaitTask
           return countries |> Seq.truncate 10
        } |> CsResult.fromAsyncResult

    member __.SaveItemsAsync(items) = 
        asyncResult {
           let! b = repository.SaveItemsAsync(items) |> Async.AwaitTask
           return b
        } |> CsResult.fromAsyncResult