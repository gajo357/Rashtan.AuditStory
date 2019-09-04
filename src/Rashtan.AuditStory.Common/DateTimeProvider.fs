namespace Rashtan.AuditStory.Common

type IDateTimeProvider = 
    abstract member GetCurrentDateTime: unit -> System.DateTime

type DateTimeProvider() =
    interface IDateTimeProvider with    
        member __.GetCurrentDateTime() = System.DateTime.UtcNow
