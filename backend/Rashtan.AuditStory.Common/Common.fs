namespace Rashtan.AuditStory.Common

module Common =
    open System

    let validateNotEmpty prop str = 
        match System.String.IsNullOrEmpty str with
        | false -> Ok ()
        | true -> Error (sprintf "%s: Cannot be empty" prop)

    let validateAlphanumeric prop (str: string) =
        match validateNotEmpty prop str with
        | Ok _ ->
            match str |> Seq.forall System.Char.IsLetterOrDigit with
            | true -> Ok ()
            | false -> Error (sprintf "%s: Has to be alphanumeric" prop)
        | Error e -> Error e

    let validateMinimum prop min value = 
        if value < min then
            Error (sprintf "%s: Has to be bigger than %A" prop min)
        else 
            Ok ()
            
    let validateGuid prop str =
        let mutable result = Guid.Empty;
        match Guid.TryParse(str, &result) with
        | true -> Ok result            
        | false -> Error (sprintf "%s: String is not a Guid" prop)
                
    let validateGuidNotEmpty prop (str: Guid) =
        match str = Guid.Empty with
        | true -> Error (sprintf "%s: Cannot be empty" prop)
        | false -> Ok()

