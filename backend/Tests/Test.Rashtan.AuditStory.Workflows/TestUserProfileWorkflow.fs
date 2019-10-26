
namespace Tests

open NUnit.Framework
open FsCheck.NUnit
open Test.Rashtan.AuditStory.DtoValidation
open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Workflows
open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.DtoDbMapper.UserMapper
open Foq

[<TestFixture>]
type TestUserProfileWorkflow() =
    [<Property(Arbitrary = [| typeof<InvalidUserGenerator> |])>]
    member __.``SaveProfileAsync does not save invalid dto`` user dto = 
        async {
            let r = Mock<IUserProfileRepository>().Create()
            let w = UserProfileWorkflow(r)

            let! result = w.SaveProfileAsync(user, dto) |> Async.AwaitTask
            return result.IsError
        } |> Async.RunSynchronously
    
    [<Property(Arbitrary = [| typeof<ValidUserGenerator> |])>]
    member __.``SaveProfileAsync saves valid dto`` user dto = 
        async {
            let r = Mock<IUserProfileRepository>.With(fun m ->
                <@
                m.SaveProfileAsync(user, any()) --> System.Threading.Tasks.Task.CompletedTask
                @>
            )
            let w = UserProfileWorkflow(r)

            let! result = w.SaveProfileAsync(user, dto) |> Async.AwaitTask
            
            return result.Result = dto
        } |> Async.RunSynchronously    

    [<Property(Arbitrary = [| typeof<ValidUserGenerator> |])>]
    member __.``GetProfileAsync gets the correct profile`` user profile = 
        async {
            let r = Mock<IUserProfileRepository>.With(fun m ->
                <@
                m.GetProfileAsync(user) --> System.Threading.Tasks.Task.FromResult profile
                @>
            )
            let w = UserProfileWorkflow(r)

            let! result = w.GetProfileAsync(user) |> Async.AwaitTask

            return result.Result = toDto profile
        } |> Async.RunSynchronously
