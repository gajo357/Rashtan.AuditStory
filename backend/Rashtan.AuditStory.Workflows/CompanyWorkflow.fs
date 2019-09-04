namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.DtoValidation.CompanyValidator
open Rashtan.AuditStory.DtoDbMapper.CompanyMapper
open Rashtan.AuditStory.Common

type CompanyWorkflow(repository: ICompanyProfileRepository, statusWorkflow: IUserStatusWorkflow) =   
    member __.CreateProfileAsync(user, dto) = 
        asyncResult {
            do! statusWorkflow.CheckWriteAccess user
            let! dto = validateProfile dto
            let db = profileToDb dto
            do! repository.CreateProfileAsync(user, db) |> Async.AwaitTask
            return dto
        } |> CsResult.fromAsyncResult

    member __.DeleteProfileAsync(user, ticker) = 
        asyncResult {
            do! statusWorkflow.CheckWriteAccess user
            do! Common.validateAlphanumeric "Ticker" ticker
            let! b = repository.DeleteProfileAsync(user, ticker) |> Async.AwaitTask
            return b
        } |> CsResult.fromAsyncResult
        
    member __.GetProfileAsync(user, ticker) = 
        asyncResult {
            do! statusWorkflow.CheckReadAccess user
            do! Common.validateAlphanumeric "Ticker" ticker
            let! b = repository.GetProfileAsync(user, ticker) |> Async.AwaitTask
            return b |> profileToDto
        } |> CsResult.fromAsyncResult
    member __.GetProfilesAsync(user) = 
        asyncResult {
            do! statusWorkflow.CheckReadAccess user
            let! b = repository.GetProfilesAsync(user) |> Async.AwaitTask
            return b |> Seq.map profileToDto
        } |> CsResult.fromAsyncResult
    member __.GetProfilesInFolderAsync(user, folderName) = 
        asyncResult {
            do! statusWorkflow.CheckReadAccess user
            do! Common.validateAlphanumeric "Folder" folderName
            let! b = repository.GetProfilesInFolderAsync(user, folderName) |> Async.AwaitTask
            return b |> Seq.map profileToDto
        } |> CsResult.fromAsyncResult