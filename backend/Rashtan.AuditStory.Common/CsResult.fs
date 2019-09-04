namespace Rashtan.AuditStory.Common

// this is a C# friendly wrapper around F# Result type

type Response<'a> = {
    // we always want to return the user status so the application can make good decisions
    UserStatus: UserStatus
    Data: 'a
}

type ErrorResponse = Response<string>

type CsResult<'TResult, 'TError> private (result: 'TResult, error: 'TError, isError: bool) =
    member __.Result = result
    member __.Error = error

    member __.IsError = isError
    member __.IsSuccess = not isError
    
    static member createResult result=
        CsResult<'TResult, 'TError>(result, Unchecked.defaultof<'TError>, false)
    static member createError error =
        CsResult<'TResult, 'TError>(Unchecked.defaultof<'TResult>, error, true)

    static member fromResult (t: Result<'TResult, 'TError>) = 
        match t with
        | Ok r -> CsResult.createResult r
        | Error e -> CsResult.createError e

    static member fromAsyncResult (t: AsyncResult<'TResult, 'TError>) = 
        async {
            let! r = t
            return CsResult.fromResult r
        } |> Async.StartAsTask

type UserDataResult<'a> = CsResult<Response<'a>, ErrorResponse>