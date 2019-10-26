namespace Test.Rashtan.AuditStory.DtoValidation

open FsCheck
open Rashtan.AuditStory.Dto

type InvalidTypesGenerator =
    static member Int() = Arb.Default.Int32() |> Arb.mapFilter (fun s -> - (abs s)) (fun s -> s < 0)
    static member Double() = Arb.Default.Float() |> Arb.mapFilter (fun s -> - (abs s)) (fun s -> s < 0.)
    static member Decimal() = Arb.Default.Decimal() |> Arb.mapFilter (fun s -> - (abs s)) (fun s -> s < 0m)
    static member Date() = Arb.Default.DateTime() |> Arb.filter(fun s -> s.Year > 2019)
    static member String() = 
        Arb.Default.String() |> Arb.filter(fun s -> 
            match System.String.IsNullOrEmpty s with
            | true -> true
            | false ->
                s |> Seq.forall System.Char.IsLetterOrDigit |> not
        )

type ValidTypesGenerator =
    static member Int() = Arb.Default.Int32() |> Arb.mapFilter abs (fun _ -> true)
    static member Double() = Arb.Default.Float() |> Arb.mapFilter abs System.Double.IsFinite
    static member Decimal() = Arb.Default.Decimal() |> Arb.mapFilter abs (fun _ -> true)
    static member Date() = Arb.Default.DateTime() |> Arb.filter(fun s -> s.Year <= 2019)
    static member String() = 
        Arb.Default.String() |> Arb.filter(fun s -> 
            match System.String.IsNullOrEmpty s with
            | true -> false
            | false ->
                s |> Seq.forall System.Char.IsLetterOrDigit                    
        )


type ValidCompanyProfileGenerator =
    static member CompanyProfile() = 
        gen {
            let! name = ValidTypesGenerator.String().Generator
            let! ticker = ValidTypesGenerator.String().Generator
            let! se = ValidTypesGenerator.String().Generator
            let! folder = ValidTypesGenerator.String().Generator
            let! mc = ValidTypesGenerator.Double().Generator
            let! ns = ValidTypesGenerator.Int().Generator
            
            return {
                Name = name
                Ticker = ticker
                StockExchange = se
                Folder = folder
                MarketCap = mc
                NumberOfShares = ns
            }
        } |> Arb.fromGen

type InvalidCompanyProfileGenerator =
    static member CompanyProfile() = 
        gen {
            let! name = InvalidTypesGenerator.String().Generator
            let! ticker = InvalidTypesGenerator.String().Generator
            let! se = InvalidTypesGenerator.String().Generator
            let! folder = InvalidTypesGenerator.String().Generator
            let! mc = InvalidTypesGenerator.Double().Generator
            let! ns = InvalidTypesGenerator.Int().Generator
            
            return {
                Name = name
                Ticker = ticker
                StockExchange = se
                Folder = folder
                MarketCap = mc
                NumberOfShares = ns
            }
        } |> Arb.fromGen

type InvalidUserGenerator =
    static member UserProfile() = 
        gen {
            let! name = InvalidTypesGenerator.String().Generator
            let! email = InvalidTypesGenerator.String().Generator
            let! country = InvalidTypesGenerator.String().Generator
            let! city = InvalidTypesGenerator.String().Generator
            let! createdAt = InvalidTypesGenerator.Date().Generator
            
            return {
                Name = name
                Email = email
                Country = country
                City = city

                CreatedAt = createdAt
            }
        } |> Arb.fromGen

type ValidUserGenerator =
    static member UserProfile() = 
        gen {
            let! nonce = ValidTypesGenerator.String().Generator
            let! email = ValidTypesGenerator.String().Generator
            let! country = ValidTypesGenerator.String().Generator
            let! city = ValidTypesGenerator.String().Generator
            let! createdAt = ValidTypesGenerator.Date().Generator
            
            return {
                Name = nonce
                Email = email
                Country = country
                City = city

                CreatedAt = createdAt
            }
        } |> Arb.fromGen
