namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.DtoValidation.UserValidator
open Rashtan.AuditStory.Common

type UserProfileWorkflow(repository: IUserProfileRepository) =
    member __.GetProfileAsync user = 
        asyncResult {
            let! dto = repository.GetProfileAsync(user) |> Async.AwaitTask
            if System.Object.ReferenceEquals(dto, null) then
                let dto: Rashtan.AuditStory.Dto.UserProfile = { 
                    Name = ""
                    Email = user
                    Country = ""
                    State = ""
                    City = ""
                }

                return dto
            else return dto
        } |> CsResult.fromAsyncResult

    member __.SaveProfileAsync(user, dto) = 
        asyncResult {
            do! validatedCreate dto
            let dto =  {
                dto with
                    Email = user
            }

            do! repository.SaveProfileAsync(user, dto) |> Async.AwaitTask
            return true
        } |> CsResult.fromAsyncResult