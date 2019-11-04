namespace Tests

open NUnit.Framework
open FsCheck.NUnit
open Test.Rashtan.AuditStory.DtoValidation
open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Workflows
open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.DtoDbMapper
open Foq

[<TestFixture>]
type TestCompanyWorkflow () =

    [<Property(Arbitrary = [| typeof<InvalidCompanyProfileGenerator> |])>]
    member __.``SaveStoryAsync does not save invalid dto`` user dto = 
        async {
            let cpr = Mock<ICompanyStoryRepository>().Create()
            let dtp = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> System.DateTime.Today
                @>
            )
            let cw = CompanyWorkflow(cpr, dtp)

            let! result = cw.SaveStoryAsync(user, dto) |> Async.AwaitTask
            return result.IsError
        } |> Async.RunSynchronously
    
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator> |])>]
    member __.``SaveStoryAsync saves valid dto`` user dto = 
        async {
            let dto = { CompanyFromDbMapper.emptyStory with Profile = dto }
            let cpr = Mock<ICompanyStoryRepository>.With(fun m ->
                <@
                m.SaveStoryAsync(user, any()) --> System.Threading.Tasks.Task.CompletedTask
                @>
            )
            let dtp = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> System.DateTime.Today
                @>
            )
            let cw = CompanyWorkflow(cpr, dtp)

            let! result = cw.SaveStoryAsync(user, dto) |> Async.AwaitTask

            return result.Result = true
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<InvalidTypesGenerator> |])>]
    member __.``DeleteStoryAsync does not delete invalid id`` user id = 
        async {
            let cpr = Mock<ICompanyStoryRepository>().Create()
            let dtp = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> System.DateTime.Today
                @>
            )
            let cw = CompanyWorkflow(cpr, dtp)

            let! result = cw.DeleteStoryAsync(user, id) |> Async.AwaitTask
            return result.Error.StartsWith "Id: "
        } |> Async.RunSynchronously
    
    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``DeleteStoryAsync deletes valid id`` user id success = 
        async {
            let cpr = Mock<ICompanyStoryRepository>.With(fun m ->
                <@
                m.DeleteStoryAsync(user, id) --> System.Threading.Tasks.Task.FromResult success
                @>
            )
            let dtp = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> System.DateTime.Today
                @>
            )
            let cw = CompanyWorkflow(cpr, dtp)

            let! result = cw.DeleteStoryAsync(user, id.ToString()) |> Async.AwaitTask

            return result.Result = success
        } |> Async.RunSynchronously

    
    [<Property(Arbitrary = [| typeof<InvalidTypesGenerator> |])>]
    member __.``GetStoryAsync does not get with invalid id`` user id = 
        async {
            let cpr = Mock<ICompanyStoryRepository>().Create()
            let dtp = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> System.DateTime.Today
                @>
            )
            let cw = CompanyWorkflow(cpr, dtp)

            let! result = cw.GetStoryAsync(user, id) |> Async.AwaitTask
            return result.Error.StartsWith "Id: "
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetStoryAsync deletes with valid id`` user id profile = 
        async {
            let cpr = Mock<ICompanyStoryRepository>.With(fun m ->
                <@
                m.GetStoryAsync(user, id) --> System.Threading.Tasks.Task.FromResult profile
                @>
            )
            let dtp = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> System.DateTime.Today
                @>
            )
            let cw = CompanyWorkflow(cpr, dtp)

            let! result = cw.GetStoryAsync(user, id.ToString()) |> Async.AwaitTask

            return result.Result = CompanyFromDbMapper.story profile
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetProfilesAsync gets valid profiles`` user profile = 
        async {
            let cpr = Mock<ICompanyStoryRepository>.With(fun m ->
                <@
                m.GetProfilesAsync(user) --> ([ profile ] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )
            let dtp = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> System.DateTime.Today
                @>
            )
            let cw = CompanyWorkflow(cpr, dtp)

            let! result = cw.GetProfilesAsync(user) |> Async.AwaitTask

            return (Seq.toList result.Result) = List.map CompanyFromDbMapper.profile [ profile ]
        } |> Async.RunSynchronously
