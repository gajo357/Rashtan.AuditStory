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
        result = Ok dto

    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator>; typeof<InvalidTypesGenerator> |])>]
    member __.``Name has to be specified`` (dto: CompanyProfile) name =
        let dto = { dto with Name = name }
        let result = CompanyValidator.validateProfile dto
        
        if System.String.IsNullOrEmpty name then
            result = Error "Name: Cannot be empty"
        else 
            result = Error "Name: Has to be alphanumeric"
    
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator>; typeof<InvalidTypesGenerator> |])>]
    member __.``Ticker has to be specified`` dto ticker =
        let dto = { dto with Ticker = ticker }
        let result = CompanyValidator.validateProfile dto
        
        if System.String.IsNullOrEmpty ticker then
            result = Error "Ticker: Cannot be empty"
        else 
            result = Error "Ticker: Has to be alphanumeric"
    
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator>; typeof<InvalidTypesGenerator> |])>]
    member __.``Stock Exchange has to be specified`` dto se =
        let dto = { dto with StockExchange = se }
        let result = CompanyValidator.validateProfile dto
        
        if System.String.IsNullOrEmpty se then
            result = Error "Stock Exchange: Cannot be empty"
        else 
            result = Error "Stock Exchange: Has to be alphanumeric"
        
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator>; typeof<InvalidTypesGenerator> |])>]
    member __.``Market Cap has to be positive`` dto mc =
        let dto = { dto with MarketCap = mc }
        let result = CompanyValidator.validateProfile dto
        result = Error "Market Cap: Has to be bigger than 0.0"
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator>; typeof<InvalidTypesGenerator> |])>]
    member __.``Number of Shares has to be positive`` dto ns =
        let dto = { dto with NumberOfShares = ns }
        let result = CompanyValidator.validateProfile dto
        result = Error "Number of shares: Has to be bigger than 0"
