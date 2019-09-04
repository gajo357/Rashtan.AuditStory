
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
            let usw = Mock<IUserStatusWorkflow>().Create()
            let r = Mock<IUserProfileRepository>().Create()
            let w = UserProfileWorkflow(r, usw)

            let! result = w.SaveProfileAsync(user, dto) |> Async.AwaitTask
            return result.IsError
        } |> Async.RunSynchronously
    
    [<Property(Arbitrary = [| typeof<ValidUserGenerator> |])>]
    member __.``SaveProfileAsync saves valid dto`` user dto = 
        async {
            let usw = Mock<IUserStatusWorkflow>().Create()
            let r = Mock<IUserProfileRepository>.With(fun m ->
                <@
                m.SaveProfileAsync(user, any()) --> System.Threading.Tasks.Task.CompletedTask
                @>
            )
            let w = UserProfileWorkflow(r, usw)

            let! result = w.SaveProfileAsync(user, dto) |> Async.AwaitTask
            
            return result.Result = dto
        } |> Async.RunSynchronously    
            
    
    [<Property>]
    member __.``GetProfileAsync does not get if does not have read rights`` user = 
        async {
            let errorText = "Not enough rights"
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Error errorText)
                @>
            )
            let r = Mock<IUserProfileRepository>().Create()
            let w = UserProfileWorkflow(r, usw)

            let! result = w.GetProfileAsync(user) |> Async.AwaitTask
            
            return result.Error = errorText
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidUserGenerator> |])>]
    member __.``GetProfileAsync gets the correct profile`` user profile = 
        async {
            let r = Mock<IUserProfileRepository>.With(fun m ->
                <@
                m.GetProfileAsync(user) --> System.Threading.Tasks.Task.FromResult profile
                @>
            )
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let w = UserProfileWorkflow(r, usw)

            let! result = w.GetProfileAsync(user) |> Async.AwaitTask

            return result.Result = toDto profile
        } |> Async.RunSynchronously
