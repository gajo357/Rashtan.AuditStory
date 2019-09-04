namespace Tests

open NUnit.Framework
open FsCheck.NUnit
open Test.Rashtan.AuditStory.DtoValidation
open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Workflows
open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.Payment
open Rashtan.AuditStory.DtoDbMapper.PaymentMapper
open Rashtan.AuditStory.DbModel
open Foq

[<TestFixture>]
type TestPaymentWorkflow () =
    
    [<Property()>]
    member __.``GetPaymentsAsync does not get if does not have read rights`` user = 
        async {
            let errorText = "Not enough rights"
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Error errorText)
                @>
            )
            let dt = Mock<IDateTimeProvider>().Create()
            let r = Mock<IPaymentRepository>().Create()
            let p = Mock<IPaymentGizmo>().Create()
            let w = PaymentWorkflow(r, p, usw, dt)

            let! result = w.GetPaymentsAsync(user) |> Async.AwaitTask
            
            return result.Error = errorText
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidPaymentGenerator> |])>]
    member __.``GetPaymentsAsync gets valid payments`` user profile = 
        async {
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckReadAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let dt = Mock<IDateTimeProvider>().Create()
            let r = Mock<IPaymentRepository>.With(fun m ->
                <@
                m.GetPaymentsAsync(user) --> ([ profile ] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )
            let p = Mock<IPaymentGizmo>().Create()
            let w = PaymentWorkflow(r, p, usw, dt)

            let! result = w.GetPaymentsAsync(user) |> Async.AwaitTask

            return (Seq.toList result.Result) = List.map toDto [ profile ]
        } |> Async.RunSynchronously
            

    [<Property()>]
    member __.``StartFreeTrialAsync does not start if status is not New`` user = 
        async {          
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.GetUserStatusAsync(user) --> AsyncResult.liftAsync UserStatus.Expired
                @>
            )
            let dt = Mock<IDateTimeProvider>().Create()
            let r = Mock<IPaymentRepository>().Create()
            let p = Mock<IPaymentGizmo>().Create()
            let w = PaymentWorkflow(r, p, usw, dt)

            let! result = w.StartFreeTrialAsync(user) |> Async.AwaitTask
            
            return result.Error = "You have already used your free trial"
        } |> Async.RunSynchronously

    [<Property()>]
    member __.``StartFreeTrialAsync starts if status is New`` user time = 
        async {
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.GetUserStatusAsync(user) --> AsyncResult.liftAsync UserStatus.New
                @>
            )
            let r = Mock<IPaymentRepository>.With(fun m ->
                <@
                m.SavePaymentAsync(user, any()) --> System.Threading.Tasks.Task.CompletedTask
                @>
            )
            let dt = Mock<IDateTimeProvider>.With(fun m ->
                <@
                m.GetCurrentDateTime() --> time
                @>
            )
            let p = Mock<IPaymentGizmo>().Create()
            let w = PaymentWorkflow(r, p, usw, dt)

            let! result = w.StartFreeTrialAsync(user) |> Async.AwaitTask

            return result.Result = (toDto (Payment.createFreeTrial(time)))
        } |> Async.RunSynchronously


    [<Property(Arbitrary = [| typeof<InvalidPaymentGenerator> |])>]
    member __.``SavePaymentAsync does not save invalid dto`` user dto = 
        async {
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckWriteAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let r = Mock<IPaymentRepository>().Create()
            let p = Mock<IPaymentGizmo>().Create()
            let dt = Mock<IDateTimeProvider>().Create()
            let w = PaymentWorkflow(r, p, usw, dt)

            let! result = w.SavePaymentAsync(user, dto) |> Async.AwaitTask
            return result.IsError
        } |> Async.RunSynchronously
    
    [<Property()>]
    member __.``SavePaymentAsync does not save if does not have write rights`` user dto = 
        async {
            let errorText = "Not enough rights"
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckWriteAccess(user) --> AsyncResult.liftAsync (Error errorText)
                @>
            )
            let r = Mock<IPaymentRepository>().Create()
            let p = Mock<IPaymentGizmo>().Create()
            let dt = Mock<IDateTimeProvider>().Create()
            let w = PaymentWorkflow(r, p, usw, dt)

            let! result = w.SavePaymentAsync(user, dto) |> Async.AwaitTask
            
            return result.Error = errorText
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidPaymentGenerator> |])>]
    member __.``SavePaymentAsync saves valid dto`` user dtoToProcess dtoProcessed = 
        async {
            let usw = Mock<IUserStatusWorkflow>.With(fun m ->
                <@
                m.CheckWriteAccess(user) --> AsyncResult.liftAsync (Ok ())
                @>
            )
            let r = Mock<IPaymentRepository>.With(fun m ->
                <@
                m.SavePaymentAsync(user, any()) --> System.Threading.Tasks.Task.CompletedTask
                @>
            )
            let p = Mock<IPaymentGizmo>.With(fun m ->
                <@
                m.SaleAsync(dtoToProcess) --> (dtoProcessed |> Ok |> AsyncResult.liftAsync)
                @>
            )
            let dt = Mock<IDateTimeProvider>().Create()
            let w = PaymentWorkflow(r, p, usw, dt)

            let! result = w.SavePaymentAsync(user, dtoToProcess) |> Async.AwaitTask

            return result.Result = dtoProcessed
        } |> Async.RunSynchronously

