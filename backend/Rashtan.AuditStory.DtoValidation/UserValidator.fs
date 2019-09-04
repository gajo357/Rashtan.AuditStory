namespace Rashtan.AuditStory.DtoValidation

module UserValidator =
    open Rashtan.AuditStory.Common
    open Rashtan.AuditStory.Dto
    open Result

    let validatedCreate (dto: UserProfile) = result {
        do! Common.validateAlphanumeric "Name" dto.Name
        do! Common.validateNotEmpty "Email" dto.Email
    }

