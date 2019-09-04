namespace Tests

open NUnit.Framework
open FsCheck.NUnit
open Test.Rashtan.AuditStory.DtoValidation
open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Workflows
open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.DtoDbMapper.CompanyMapper
open Foq

[<TestFixture>]
type TestCompanyWorkflow () =

    [<Property(Arbitrary = [| typeof<InvalidCompanyProfileGenerator> |])>]
    member __.``CreateProfileAsync does not save invalid dto`` user dto = 
        async {
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckWriteAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let cpr = Mock<ICompanyProfileRepository>().Create()
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.CreateProfileAsync(user, dto) |> Async.AwaitTask
            return result.IsError
        } |> Async.RunSynchronously
    
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator> |])>]
    member __.``CreateProfileAsync does not save if does not have write rights`` user dto = 
        async {
            let errorText = "Not enough rights"
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckWriteAccess(user) --> AsyncResult.liftAsync (Error errorText)
                @>
            )
            let cpr = Mock<ICompanyProfileRepository>().Create()
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.CreateProfileAsync(user, dto) |> Async.AwaitTask
            
            return result.Error = errorText
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator> |])>]
    member __.``CreateProfileAsync saves valid dto`` user dto = 
        async {
            let cpr = Mock<ICompanyProfileRepository>.With(fun m ->
                <@
                m.CreateProfileAsync(user, any()) --> System.Threading.Tasks.Task.CompletedTask
                @>
            )
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckWriteAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.CreateProfileAsync(user, dto) |> Async.AwaitTask

            return result.Result = dto
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<InvalidTypesGenerator> |])>]
    member __.``DeleteProfileAsync does not delete invalid ticker`` user ticker = 
        async {
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckWriteAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let cpr = Mock<ICompanyProfileRepository>().Create()
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.DeleteProfileAsync(user, ticker) |> Async.AwaitTask
            return result.Error.StartsWith "Ticker: "
        } |> Async.RunSynchronously
    
    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``DeleteProfileAsync does not delete if does not have write rights`` user ticker = 
        async {
            let errorText = "Not enough rights"
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckWriteAccess(user) --> AsyncResult.liftAsync (Error errorText)
                @>
            )
            let cpr = Mock<ICompanyProfileRepository>().Create()
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.DeleteProfileAsync(user, ticker) |> Async.AwaitTask
            
            return result.Error = errorText
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``DeleteProfileAsync deletes valid ticker`` user ticker success = 
        async {
            let cpr = Mock<ICompanyProfileRepository>.With(fun m ->
                <@
                m.DeleteProfileAsync(user, ticker) --> System.Threading.Tasks.Task.FromResult success
                @>
            )
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckWriteAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.DeleteProfileAsync(user, ticker) |> Async.AwaitTask

            return result.Result = success
        } |> Async.RunSynchronously

    
    [<Property(Arbitrary = [| typeof<InvalidTypesGenerator> |])>]
    member __.``GetProfileAsync does not get with invalid ticker`` user ticker = 
        async {
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let cpr = Mock<ICompanyProfileRepository>().Create()
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.GetProfileAsync(user, ticker) |> Async.AwaitTask
            return result.Error.StartsWith "Ticker: "
        } |> Async.RunSynchronously
    
    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetProfileAsync does not get if does not have read rights`` user ticker = 
        async {
            let errorText = "Not enough rights"
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Error errorText)
                @>
            )
            let cpr = Mock<ICompanyProfileRepository>().Create()
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.GetProfileAsync(user, ticker) |> Async.AwaitTask
            
            return result.Error = errorText
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetProfileAsync deletes with valid ticker`` user ticker profile = 
        async {
            let cpr = Mock<ICompanyProfileRepository>.With(fun m ->
                <@
                m.GetProfileAsync(user, ticker) --> System.Threading.Tasks.Task.FromResult profile
                @>
            )
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.GetProfileAsync(user, ticker) |> Async.AwaitTask

            return result.Result = profileToDto profile
        } |> Async.RunSynchronously
    
       
    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetProfilesAsync does not get if does not have read rights`` user = 
        async {
            let errorText = "Not enough rights"
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Error errorText)
                @>
            )
            let cpr = Mock<ICompanyProfileRepository>().Create()
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.GetProfilesAsync(user) |> Async.AwaitTask
            
            return result.Error = errorText
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetProfilesAsync gets valid profiles`` user profile = 
        async {
            let cpr = Mock<ICompanyProfileRepository>.With(fun m ->
                <@
                m.GetProfilesAsync(user) --> ([ profile ] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.GetProfilesAsync(user) |> Async.AwaitTask

            return (Seq.toList result.Result) = List.map profileToDto [ profile ]
        } |> Async.RunSynchronously


    [<Property(Arbitrary = [| typeof<InvalidTypesGenerator> |])>]
    member __.``GetProfilesInFolderAsync does not get with invalid folder`` user folder = 
        async {
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let cpr = Mock<ICompanyProfileRepository>().Create()
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.GetProfilesInFolderAsync(user, folder) |> Async.AwaitTask
            return result.Error.StartsWith "Folder: "
        } |> Async.RunSynchronously
    
    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetProfilesInFolderAsync does not get if does not have read rights`` user folder = 
        async {
            let errorText = "Not enough rights"
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Error errorText)
                @>
            )
            let cpr = Mock<ICompanyProfileRepository>().Create()
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.GetProfilesInFolderAsync(user, folder) |> Async.AwaitTask
            
            return result.Error = errorText
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetProfilesInFolderAsync gets with valid folder`` user folder profile = 
        async {
            let cpr = Mock<ICompanyProfileRepository>.With(fun m ->
                <@
                m.GetProfilesInFolderAsync(user, folder) --> ([ profile ] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let cw = CompanyWorkflow(cpr, usw)

            let! result = cw.GetProfilesInFolderAsync(user, folder) |> Async.AwaitTask

            return (Seq.toList result.Result) = List.map profileToDto [ profile ]
        } |> Async.RunSynchronously