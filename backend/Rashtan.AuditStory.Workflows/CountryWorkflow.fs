namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.Common

type CountryWorkflow(repository: ICountriesRepository) = 
    member __.GetCountriesAsync() = 
        asyncResult {
           let! countries = repository.GetCountriesAsync() |> Async.AwaitTask
           return countries
        } |> CsResult.fromAsyncResult
    member __.GetCurrenciesAsync() = 
        asyncResult {
            let! countries = repository.GetCountriesAsync() |> Async.AwaitTask

            return countries 
                |> Seq.collect (fun c -> c.Currencies) 
                |> Seq.distinctBy (fun c -> c.Code)
        } |> CsResult.fromAsyncResult

    member __.SaveCountriesAsync(countries) = 
        asyncResult {
           let! b = repository.SaveCountriesAsync(countries) |> Async.AwaitTask
           return b
        } |> CsResult.fromAsyncResult