namespace Tests

open NUnit.Framework
open FsCheck.NUnit
open Test.Rashtan.AuditStory.DtoValidation
open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Workflows
open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Dto
open Foq

[<TestFixture>]
type TestCompanyWorkflow () =

    [<Property(Arbitrary = [| typeof<InvalidCompanyProfileGenerator> |])>]
    member __.``SaveStoryAsync does not save invalid dto`` user dto = 
        async {
            let cpr = Mock<ICompanyStoryRepository>().Create()
            let cw = CompanyWorkflow(cpr)

            let! result = cw.SaveStoryAsync(user, dto) |> Async.AwaitTask
            return result.IsError
        } |> Async.RunSynchronously
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator> |])>]
    member __.``SaveStoryAsync saves valid dto`` user dto = 
        async {
            let dto = { Empty.emptyStory with Profile = dto }
            let cpr = Mock<ICompanyStoryRepository>.With(fun m ->
                <@
                m.SaveStoryAsync(user, any()) --> System.Threading.Tasks.Task.CompletedTask
                @>
            )
            let cw = CompanyWorkflow(cpr)

            let! result = cw.SaveStoryAsync(user, dto) |> Async.AwaitTask

            return result.Result = true
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<InvalidTypesGenerator> |])>]
    member __.``DeleteStoryAsync does not delete invalid id`` user id = 
        async {
            let cpr = Mock<ICompanyStoryRepository>().Create()
            let cw = CompanyWorkflow(cpr)

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
            let cw = CompanyWorkflow(cpr)

            let! result = cw.DeleteStoryAsync(user, id.ToString()) |> Async.AwaitTask

            return result.Result = success
        } |> Async.RunSynchronously

    
    [<Property(Arbitrary = [| typeof<InvalidTypesGenerator> |])>]
    member __.``GetStoryAsync does not get with invalid id`` user id = 
        async {
            let cpr = Mock<ICompanyStoryRepository>().Create()
            let cw = CompanyWorkflow(cpr)

            let! result = cw.GetStoryAsync(user, id) |> Async.AwaitTask
            return result.Error.StartsWith "Id: "
        } |> Async.RunSynchronously
    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetStoryAsync with valid id`` user id profile = 
        async {
            let cpr = Mock<ICompanyStoryRepository>.With(fun m ->
                <@
                m.GetStoryAsync(user, id) --> System.Threading.Tasks.Task.FromResult profile
                @>
            )
            let cw = CompanyWorkflow(cpr)

            let! result = cw.GetStoryAsync(user, id.ToString()) |> Async.AwaitTask

            return result.Result = profile
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetQuickInfosAsync gets valid stories`` user profile = 
        async {
            let cpr = Mock<ICompanyStoryRepository>.With(fun m ->
                <@
                m.GetQuickInfosAsync(user) --> ([ profile ] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )
            let cw = CompanyWorkflow(cpr)

            let! result = cw.GetQuickInfosAsync(user) |> Async.AwaitTask

            return (Seq.toList result.Result) = [ profile ]
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<InvalidCompanyProfileGenerator> |])>]
    member __.``CreateStoryAsync does not save invalid dto`` user dto = 
        async {
            let cpr = Mock<ICompanyStoryRepository>().Create()
            let cw = CompanyWorkflow(cpr)

            let! result = cw.CreateStoryAsync(user, dto) |> Async.AwaitTask
            return result.IsError
        } |> Async.RunSynchronously
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator> |])>]
    member __.``CreateStoryAsync saves valid dto`` user dto = 
        async {
            let cpr = Mock<ICompanyStoryRepository>.With(fun m -> 
                <@ m.SaveStoryAsync(user, any()) --> System.Threading.Tasks.Task.CompletedTask @>)
            let cw = CompanyWorkflow(cpr)

            let! result = cw.CreateStoryAsync(user, dto) |> Async.AwaitTask

            return result.Result |> (=) System.Guid.Empty |> not
        } |> Async.RunSynchronously
    [<Property(Arbitrary = [| typeof<ValidCompanyProfileGenerator> |])>]
    member __.``CreateStoryAsync preserves name`` user dto s = 
        async {
            let mutable savedDbModel = None
            let cpr = { new ICompanyStoryRepository with
                member __.SaveStoryAsync(_, d) =
                    savedDbModel <- Some d
                    System.Threading.Tasks.Task.CompletedTask
                member __.DeleteStoryAsync(_, _) = System.Threading.Tasks.Task.FromResult(true)
                member __.GetQuickInfosAsync(_) = System.Threading.Tasks.Task.FromResult([||] |> Array.toSeq)
                member __.GetStoryAsync(_, _) = System.Threading.Tasks.Task.FromResult(s)
                }
            let cw = CompanyWorkflow(cpr)

            let! _ = cw.CreateStoryAsync(user, dto) |> Async.AwaitTask

            return savedDbModel.Value.Profile.Name = dto.Name
        } |> Async.RunSynchronously

