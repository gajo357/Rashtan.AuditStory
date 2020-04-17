namespace Test.Rashtan.AuditStory.DtoValidation

open NUnit.Framework
open FsCheck.NUnit
open Rashtan.AuditStory.Dto
open Rashtan.AuditStory.DtoValidation

[<TestFixture>]
type TestCompanyValidator() =
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator> |])>]
    member __.``Valid company profile passes the test`` dto =
        let result = CompanyValidator.validateProfile dto
        result = Ok()

    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator>; typeof<InvalidTypesGenerator> |])>]
    member __.``Profile Name has to be specified`` (dto: Profile) name =
        let dto = { dto with Name = name }
        let result = CompanyValidator.validateProfile dto
        
        if System.String.IsNullOrEmpty name then
            result = Error "Name: Cannot be empty"
        else 
            result = Error "Name: Has to be alphanumeric"

    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator>; typeof<InvalidTypesGenerator> |])>]
    member __.``Story create Name has to be specified`` (dto: CompanyStoryCreate) name =
        let dto = { dto with Name = name }
        let result = CompanyValidator.validateCreateStory dto
        
        if System.String.IsNullOrEmpty name then
            result = Error "Name: Cannot be empty"
        else 
            result = Error "Name: Has to be alphanumeric"
