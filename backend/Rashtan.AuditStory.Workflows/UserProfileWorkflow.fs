namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.DtoValidation.UserValidator
open Rashtan.AuditStory.Common

type UserProfileWorkflow(repository: IUserProfileRepository) =
    member __.GetProfileAsync user = 
        asyncResult {
            let! b = repository.GetProfileAsync(user) |> Async.AwaitTask
            return b
        } |> CsResult.fromAsyncResult

    member __.SaveProfileAsync(user, email, dto) = 
        asyncResult {
            do! validatedCreate dto
            let dto =  {
                dto with
                    Email = email
            }

            do! repository.SaveProfileAsync(user, dto) |> Async.AwaitTask
            return true
        } |> CsResult.fromAsyncResult