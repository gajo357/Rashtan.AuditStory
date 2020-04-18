namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.DtoValidation.CompanyValidator
open Rashtan.AuditStory.Common

type CompanyWorkflow(repository: ICompanyStoryRepository) =       
    member __.GetStoryAsync(user, id) = 
       asyncResult {
           let! id = Common.validateGuid "Id" id
           let! b = repository.GetStoryAsync(user, id) |> Async.AwaitTask
           return b
       } |> CsResult.fromAsyncResult
    member __.SaveStoryAsync(user, dto) = 
        asyncResult {
            let! dto = validateStory dto
            do! repository.SaveStoryAsync(user, dto) |> Async.AwaitTask
            return true
        } |> CsResult.fromAsyncResult
    member __.DeleteStoryAsync(user, id) = 
        asyncResult {
            let! id = Common.validateGuid "Id" id
            let! b = repository.DeleteStoryAsync(user, id) |> Async.AwaitTask
            return b
        } |> CsResult.fromAsyncResult

    member __.GetQuickInfosAsync(user) = 
        asyncResult {
            let! b = repository.GetQuickInfosAsync(user) |> Async.AwaitTask
            return b
        } |> CsResult.fromAsyncResult
    member __.CreateStoryAsync(user, dto) = 
        asyncResult {
            do! validateCreateStory dto
            let dto = { 
                Rashtan.AuditStory.Dto.Empty.emptyStory with
                    Id = System.Guid.NewGuid()
                    Profile = {
                        Rashtan.AuditStory.Dto.Empty.emptyStory.Profile with
                            Name = dto.Name
                    }
            }
            do! repository.SaveStoryAsync(user, dto) |> Async.AwaitTask
            return dto.Id
        } |> CsResult.fromAsyncResult