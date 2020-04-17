namespace Rashtan.AuditStory.Common

// this is a C# friendly wrapper around F# Result type

type CsResult<'TResult> private (result: 'TResult, error: string, isError: bool) =
    member __.Result = result
    member __.Error = error

    member __.IsError = isError
    member __.IsSuccess = not isError
    
    static member createResult result=
        CsResult<'TResult>(result, null, false)
    static member createError error =
        CsResult<'TResult>(Unchecked.defaultof<'TResult>, error, true)

    static member fromResult (t: Result<'TResult, string>) = 
        match t with
        | Ok r -> CsResult.createResult r
        | Error e -> CsResult.createError e

    static member fromAsyncResult (t: AsyncResult<'TResult, string>) = 
        async {
            let! r = t
            return CsResult.fromResult r
        } |> Async.StartAsTask

type CsResult =
    static member MapResult (map: 'TResult -> 'a) (result: CsResult<'TResult>) =
        match result.IsSuccess with
        | true -> 
            let n = map result.Result
            CsResult<'a>.createResult n
        | false -> 
            CsResult<'a>.createError result.Error
