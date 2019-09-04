namespace Rashtan.AuditStory.Common

type AsyncResult<'a, 'b> = Async<Result<'a, 'b>>

module Async =
    let map f op = async {
        let! x    = op
        let value = f x
        return value
    }

/// functions for AsyncResult 
module AsyncResult =
    let liftAsync x = 
        async { return x }
    
    let returnFrom (value: Async<Result<'a, 'b>>) : Async<Result<'a, 'b>> = 
        value
    
    let bind (binder: 'a -> Async<Result<'b, 'c>>) (asyncResult: Async<Result<'a, 'c>>) : Async<Result<'b, 'c>> = 
        async {
            let! result = asyncResult
            match result with
            | Ok x -> return! binder x
            | Error x -> return! Error x |> liftAsync
        }
    
    let bindResult (binder: 'a -> Async<Result<'b, 'c>>) (result: Result<'a, 'c>) : Async<Result<'b, 'c>> = 
        bind binder (liftAsync result)
    
    let bindAsync (binder: 'a -> Async<Result<'b, 'c>>) (asnc: Async<'a>) : Async<Result<'b, 'c>> = 
        bind binder (Async.map Ok asnc)
    
    type AsyncResultBuilder() =    
        member __.Return value = async { return Ok value }
        member __.ReturnFrom value = returnFrom value
        member __.Bind (asyncResult, binder) = bind binder asyncResult
        member __.Bind (result, binder) = bindResult binder result
        member __.Bind (async, binder) = bindAsync binder async
    
    let asyncResult = AsyncResultBuilder()