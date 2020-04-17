namespace Test.Rashtan.AuditStory.DtoValidation

open FsCheck
open Rashtan.AuditStory.Dto

type InvalidTypesGenerator =
    static member Int() = Arb.Default.Int32() |> Arb.mapFilter (fun s -> - (abs s)) (fun s -> s < 0)
    static member Double() = Arb.Default.Float() |> Arb.mapFilter (fun s -> - (abs s)) (fun s -> s < 0.)
    static member Decimal() = Arb.Default.Decimal() |> Arb.mapFilter (fun s -> - (abs s)) (fun s -> s < 0m)
    static member Date() = Arb.Default.DateTime() |> Arb.filter(fun s -> s.Year > 2019)
    static member Guid() = Arb.Default.Guid() |> Arb.mapFilter (fun _ -> System.Guid.Empty) (fun _ -> true)
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
    static member Guid() = Arb.Default.Guid() |> Arb.filter(fun s -> not (s = System.Guid.Empty))
    static member String() = 
        Arb.Default.String() |> Arb.filter(fun s -> 
            match System.String.IsNullOrEmpty s with
            | true -> false
            | false ->
                s |> Seq.forall System.Char.IsLetterOrDigit                    
        )


type ValidCompanyProfileGenerator =
    static member Profile() = 
        gen {
            let! name = ValidTypesGenerator.String().Generator
            let! website = ValidTypesGenerator.String().Generator
            let! curr = ValidTypesGenerator.String().Generator
            let! mc = ValidTypesGenerator.Double().Generator
            let! industry = ValidTypesGenerator.String().Generator
            
            return {
                Name = name
                Website = website
                MarketCap = mc
                Industry = industry
                Tags = [| name; website; industry; curr |]
                Unit = {
                    Currency = curr
                    Unit = UnitOfSize.Thousand
                }
            }
        } |> Arb.fromGen
        
    static member ProfileCreate() = 
        gen {
            let! name = ValidTypesGenerator.String().Generator
                
            return {
                Name = name
            }
        } |> Arb.fromGen

type InvalidCompanyProfileGenerator =
    static member Profile() = 
        gen {
            let! name = InvalidTypesGenerator.String().Generator
            let! website = InvalidTypesGenerator.String().Generator
            let! curr = InvalidTypesGenerator.String().Generator
            let! mc = InvalidTypesGenerator.Double().Generator
            let! industry = InvalidTypesGenerator.String().Generator
            
            return {
                Name = name
                Website = website
                MarketCap = mc
                Industry = industry
                Tags = [| null; ""; name; name |]
                Unit = {
                    Currency = curr
                    Unit = UnitOfSize.Thousand
                }
            }
        } |> Arb.fromGen

    static member ProfileCreate() = 
        gen {
            let! name = InvalidTypesGenerator.String().Generator
                
            return {
                Name = name
            }
        } |> Arb.fromGen

type InvalidUserGenerator =
    static member UserProfile() = 
        gen {
            let! name = InvalidTypesGenerator.String().Generator
            let! email = InvalidTypesGenerator.String().Generator
            let! country = InvalidTypesGenerator.String().Generator
            let! city = InvalidTypesGenerator.String().Generator
            let! state = InvalidTypesGenerator.String().Generator
            
            return {
                Name = name
                Email = email
                Country = country
                State = state
                City = city
            }
        } |> Arb.fromGen

type ValidUserGenerator =
    static member UserProfile() = 
        gen {
            let! nonce = ValidTypesGenerator.String().Generator
            let! email = ValidTypesGenerator.String().Generator
            let! country = ValidTypesGenerator.String().Generator
            let! city = ValidTypesGenerator.String().Generator
            let! state = ValidTypesGenerator.String().Generator
            
            return {
                Name = nonce
                Email = email
                Country = country
                State = state
                City = city
            }
        } |> Arb.fromGen
