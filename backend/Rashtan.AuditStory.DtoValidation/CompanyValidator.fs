module Rashtan.AuditStory.DtoValidation.CompanyValidator

open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Dto
open Result


let validateCreateStory (dto: CompanyStoryCreate) = result {
    do! Common.validateAlphanumeric "Name" dto.Name
}

let validateProfile (dto: Profile) = result {
    do! Common.validateAlphanumeric "Name" dto.Name
}

let validateStory (dto: Story) = result {
    do! validateProfile dto.Profile

    return dto
}
