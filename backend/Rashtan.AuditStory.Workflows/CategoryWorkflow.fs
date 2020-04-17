﻿namespace Rashtan.AuditStory.Workflows

open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Common.AsyncResult
open Rashtan.AuditStory.Common

type CategoryWorkflow(repository: ICategoriesRepository) = 
    member __.GetCategories(user) = 
        asyncResult {
           let! b = repository.GetCategoriesAsync(user) |> Async.AwaitTask
           return b
        } |> CsResult.fromAsyncResult
    member __.SaveCategory(user, category) = 
        asyncResult {
            do! repository.SaveCategoryAsync(user, category) |> Async.AwaitTask
            return true
        } |> CsResult.fromAsyncResult
    member __.SaveCategories(user, categories) = 
        asyncResult {
           let! b = repository.SaveCategoriesAsync(user, categories) |> Async.AwaitTask
           return b
        } |> CsResult.fromAsyncResult