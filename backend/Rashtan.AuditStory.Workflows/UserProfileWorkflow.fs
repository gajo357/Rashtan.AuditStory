namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.DtoValidation.UserValidator
open Rashtan.AuditStory.DtoDbMapper.UserMapper
open Rashtan.AuditStory.Common

type UserProfileWorkflow(repository: IUserProfileRepository, statusWorkflow: IUserStatusWorkflow) =
    member __.GetUserStatusAsync user = 
        statusWorkflow.GetUserStatusAsync(user) |> Async.StartAsTask

    member __.GetProfileAsync user = 
        asyncResult {
            do! statusWorkflow.CheckReadAccess user
            let! b = repository.GetProfileAsync(user) |> Async.AwaitTask
            return b |> toDto
        } |> CsResult.fromAsyncResult

    member __.SaveProfileAsync(user, dto) = 
        asyncResult {
            do! validatedCreate dto
            let db = toDb dto
            do! repository.SaveProfileAsync(user, db) |> Async.AwaitTask
            return dto
        } |> CsResult.fromAsyncResult