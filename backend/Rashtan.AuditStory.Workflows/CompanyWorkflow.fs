namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.DtoValidation.CompanyValidator
open Rashtan.AuditStory.DtoDbMapper
open Rashtan.AuditStory.Common

type CompanyWorkflow(repository: ICompanyStoryRepository, dateTimeProvider: IDateTimeProvider) =       
    member __.GetStoryAsync(user, id) = 
       asyncResult {
           let! id = Common.validateGuid "Id" id
           let! b = repository.GetStoryAsync(user, id) |> Async.AwaitTask
           return b |> CompanyFromDbMapper.story
       } |> CsResult.fromAsyncResult
    member __.SaveStoryAsync(user, dto) = 
        asyncResult {
            let! dto = validateStory dto
            let db = CompanyToDbMapper.story dateTimeProvider.GetCurrentDateTime dto
            do! repository.SaveStoryAsync(user, db) |> Async.AwaitTask
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
            return b |> Seq.map CompanyFromDbMapper.profile
        } |> CsResult.fromAsyncResult
    member __.CreateStoryAsync(user, dto) = 
        asyncResult {
            do! validateCreateStory dto
            let db = CompanyToDbMapper.createStory dateTimeProvider.GetCurrentDateTime dto
            do! repository.SaveStoryAsync(user, db) |> Async.AwaitTask
            return db.Profile.Id
        } |> CsResult.fromAsyncResult