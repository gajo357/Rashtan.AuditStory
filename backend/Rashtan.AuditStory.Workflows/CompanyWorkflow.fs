namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.DtoValidation.CompanyValidator
open Rashtan.AuditStory.Common

type CompanyWorkflow(repository: ICompanyStoryRepository, dateTimeProvider: IDateTimeProvider) =       
    member __.GetStoryAsync(user, id) = 
       asyncResult {
           let! id = Common.validateGuid "Id" id
           let! b = repository.GetStoryAsync(user, id) |> Async.AwaitTask
           return b
       } |> CsResult.fromAsyncResult
    member __.SaveStoryAsync(user, dto) = 
        asyncResult {
            let! dto = validateStory dto
            let dto = {
                dto with
                    LastEdited = dateTimeProvider.GetCurrentDateTime()
            }
            do! repository.SaveStoryAsync(user, dto) |> Async.AwaitTask
            return true
        } |> CsResult.fromAsyncResult
    member __.DeleteStoryAsync(user, id) = 
        asyncResult {
            let! id = Common.validateGuid "Id" id
            let! b = repository.DeleteStoryAsync(user, id) |> Async.AwaitTask
            return b
        } |> CsResult.fromAsyncResult

    member __.GetProfilesAsync(user) = 
        asyncResult {
            let! b = repository.GetProfilesAsync(user) |> Async.AwaitTask
            return b
        } |> CsResult.fromAsyncResult
    member __.CreateStoryAsync(user, dto) = 
        asyncResult {
            do! validateCreateStory dto
            let dto = { 
                Rashtan.AuditStory.Dto.Empty.emptyStory with
                    Id = System.Guid.NewGuid()
                    LastEdited = dateTimeProvider.GetCurrentDateTime()
                    Profile = {
                        Rashtan.AuditStory.Dto.Empty.emptyStory.Profile with
                            Name = dto.Name
                    }
            }
            do! repository.SaveStoryAsync(user, dto) |> Async.AwaitTask
            return dto.Id
        } |> CsResult.fromAsyncResult