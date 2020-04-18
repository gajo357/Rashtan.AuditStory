module Rashtan.AuditStory.DtoValidation.CompanyValidator

open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Dto
open Result

let itemNotNull dto = 
    if System.Object.ReferenceEquals(dto, null) then false
    else true

let validateProfile (dto: Profile) = result {
    let dto = {
        dto with
            Name = 
                if System.String.IsNullOrEmpty(dto.Name) then ""
                else dto.Name.Trim()
    }

    do! Common.validateValidName "Name" dto.Name

    return {
        dto with 
            Tags = dto.Tags |> Array.filter itemNotNull
    }
}

let validateRevenue (dto: Revenue) = result {
    return {
        dto with
            ByClient = dto.ByClient |> Array.filter itemNotNull
            ByLocation = dto.ByLocation |> Array.filter itemNotNull
            ByProduct = dto.ByProduct |> Array.filter itemNotNull
    }
}

let validateCompetition (dto: Competition) = result {
    return {
        dto with
            Competitors = dto.Competitors |> Array.filter itemNotNull
    }
}

let validateVerdict (dto: Verdict) = result {
    return {
        dto with
            Flags = dto.Flags |> Array.filter itemNotNull
    }
}

let validateStory (dto: Story) = result {
    let! profile = validateProfile dto.Profile
    let! revenue = validateRevenue dto.Revenue
    let! competition = validateCompetition dto.Competition
    let! verdict = validateVerdict dto.Verdict

    return {
        dto with 
            Profile = profile
            Revenue = revenue
            Competition = competition
            Verdict = verdict
    }
}
