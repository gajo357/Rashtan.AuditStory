namespace Rashtan.AuditStory.Common

type ValidationError = {
    Message: string
    Property: string
}

type UserStatus = New=0 | Trial=1 | TrialExpired=2 | Paying=3 | Expired=4

module Common =
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

