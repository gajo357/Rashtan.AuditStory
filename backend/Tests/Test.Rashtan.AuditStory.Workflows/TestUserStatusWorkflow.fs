namespace Tests

open NUnit.Framework
open FsCheck.NUnit
open Test.Rashtan.AuditStory.DtoValidation
open Rashtan.AuditStory.Common
open Rashtan.AuditStory.Workflows
open Rashtan.AuditStory.Repository.Interface
open Rashtan.AuditStory.DbModel
open Foq

[<TestFixture>]
type TestUserStatusWorkflow() =

    [<Property>]
    member __.``GetUserStatusAsync returns New when no payments`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> time
                @>
            )
            let pr = Mock<IPaymentRepository>.With(fun m ->
                <@
                m.GetPaymentsAsync(user) --> ([] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )
            let! result = Workflow.getUserStatusAsync pr dt user

            return result = (UserStatus.New, time)
        } |> Async.RunSynchronously
    
    [<Property>]
    member __.``GetUserStatusAsync returns Trial for the trial user`` user time = 
        async {
            let dto = Payment.createFreeTrial(time)
            let dt = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> time
                @>
            )
            let pr = Mock<IPaymentRepository>.With(fun m ->
                <@
                m.GetPaymentsAsync(user) --> ([dto] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )
            
            let! result = Workflow.getUserStatusAsync pr dt user
            
            return result = (UserStatus.Trial, dto.PayedUntil)
        } |> Async.RunSynchronously

    [<Property>]
    member __.``GetUserStatusAsync returns TrialExpired for the trial user with date over 30 days`` user (time: System.DateTime) = 
        async {
            let dto = Payment.createFreeTrial(time)
            let expiredTime = time.AddDays 32.
            let dt = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> expiredTime
                @>
            )
            let pr = Mock<IPaymentRepository>.With(fun m ->
                <@
                m.GetPaymentsAsync(user) --> ([dto] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )

            let! result = Workflow.getUserStatusAsync pr dt user
            
            return result = (UserStatus.TrialExpired, dto.PayedUntil)
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetUserStatusAsync returns Paying for the payment within limits`` user dto amount = 
        async {
            let dto = { dto with Amount = amount + 1m  }
            let time = dto.PayedUntil.AddDays (-1.)

            let dt = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> time
                @>
            )
            let pr = Mock<IPaymentRepository>.With(fun m ->
                <@
                m.GetPaymentsAsync(user) --> ([dto] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )

            let! result = Workflow.getUserStatusAsync pr dt user
            
            return result = (UserStatus.Paying, dto.PayedUntil)
        } |> Async.RunSynchronously

    [<Property(Arbitrary = [| typeof<ValidTypesGenerator> |])>]
    member __.``GetUserStatusAsync returns Expired for the payment after Until date`` user dto amount = 
        async {
            let dto = { dto with Amount = amount + 1m }
            let time = dto.PayedUntil.AddDays (1.)

            let dt = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> time
                @>
            )
            let pr = Mock<IPaymentRepository>.With(fun m ->
                <@
                m.GetPaymentsAsync(user) --> ([dto] |> List.toSeq |> System.Threading.Tasks.Task.FromResult)
                @>
            )
            
            let! result = Workflow.getUserStatusAsync pr dt user
                        
            return result = (UserStatus.Expired, dto.PayedUntil)
        } |> Async.RunSynchronously

    
    [<Property>]
    member __.``GetUserStatusAsync returns status from the function`` user status time = 
        async {
            let dt = Mock<IDateTimeProvider>().Create()
            let gus _ = async {
                return status, time
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).GetUserStatusAsync user
                        
            return result = status
        } |> Async.RunSynchronously


    [<Property>]
    member __.``CheckWriteAccess not allowed for New user`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>().Create()
            let gus _ = async {
                return UserStatus.New, time
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckWriteAccess user
                        
            return result = Error "You do not have write status"
        } |> Async.RunSynchronously
    
    [<Property>]
    member __.``CheckWriteAccess not allowed for TrialExpired user`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>().Create()
            let gus _ = async {
                return UserStatus.TrialExpired, time
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckWriteAccess user
                        
            return result = Error "You do not have write status"
        } |> Async.RunSynchronously
    
    [<Property>]
    member __.``CheckWriteAccess not allowed for Expired user`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>().Create()
            let gus _ = async {
                return UserStatus.Expired, time
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckWriteAccess user
                        
            return result = Error "You do not have write status"
        } |> Async.RunSynchronously
    
    [<Property>]
    member __.``CheckWriteAccess allowed for Trial user`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>().Create()
            let gus _ = async {
                return UserStatus.Trial, time
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckWriteAccess user
                        
            return result = Ok()
        } |> Async.RunSynchronously
    
    [<Property>]
    member __.``CheckWriteAccess allowed for Paying user`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>().Create()
            let gus _ = async {
                return UserStatus.Paying, time
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckWriteAccess user
                        
            return result = Ok()
        } |> Async.RunSynchronously


    [<Property>]
    member __.``CheckReadAccess not allowed for New user`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>().Create()
            let gus _ = async {
                return UserStatus.New, time
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckReadAccess user
                        
            return result = Error "You do not have read status"
        } |> Async.RunSynchronously
    
    [<Property>]
    member __.``CheckReadAccess not allowed for TrialExpired user if expired more than 30 days`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> time
                @>
            )
            let gus _ = async {
                return UserStatus.TrialExpired, time.AddDays(-32.)
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckReadAccess user
                        
            return result = Error "You do not have read status"
        } |> Async.RunSynchronously
    [<Property>]
    member __.``CheckReadAccess allowed for TrialExpired user if expired less than 30 days`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> time
                @>
            )
            let gus _ = async {
                return UserStatus.TrialExpired, time.AddDays -29.
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckReadAccess user
                        
            return result = Ok()
        } |> Async.RunSynchronously
    
    [<Property>]
    member __.``CheckReadAccess not allowed for Expired user if expired more than 30 days`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> time
                @>
            )
            let gus _ = async {
                return UserStatus.Expired, time.AddDays(-32.)
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckReadAccess user
                        
            return result = Error "You do not have read status"
        } |> Async.RunSynchronously
    
    [<Property>]
    member __.``CheckReadAccess allowed for Expired user if expired less than 30 days`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>.With(fun m -> 
                <@
                m.GetCurrentDateTime() --> time
                @>
            )
            let gus _ = async {
                return UserStatus.Expired, time.AddDays(-29.)
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckReadAccess user
                        
            return result = Ok()
        } |> Async.RunSynchronously

    [<Property>]
    member __.``CheckReadAccess allowed for Trial user`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>().Create()
            let gus _ = async {
                return UserStatus.Trial, time
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckReadAccess user
                        
            return result = Ok()
        } |> Async.RunSynchronously
    
    [<Property>]
    member __.``CheckReadAccess allowed for Paying user`` user time = 
        async {
            let dt = Mock<IDateTimeProvider>().Create()
            let gus _ = async {
                return UserStatus.Paying, time
            }
                
            let usw = UserStatusWorkflow'(dt, gus)
            let! result = (usw :> IUserStatusWorkflow).CheckReadAccess user
                        
            return result = Ok()
        } |> Async.RunSynchronously