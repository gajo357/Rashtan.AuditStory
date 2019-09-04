namespace Rashtan.AuditStory.Common

type ResultBuilder() =
    member __.Return(x) = Ok x
    member __.Bind(x, f) = Result.bind f x

module Result =
    let result = ResultBuilder()