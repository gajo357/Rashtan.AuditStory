﻿namespace Rashtan.AuditStory.Workflows

open System.Runtime.CompilerServices
open Microsoft.Extensions.DependencyInjection
open Rashtan.AuditStory.Common

[<Extension>]
type ServiceCollectionExtension =
    [<Extension>]
    static member RegisterWorkflows(services: IServiceCollection) =
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>()
                .AddSingleton<IUserStatusWorkflow, UserStatusWorkflow>()
                .AddSingleton<CompanyWorkflow>()
                .AddSingleton<PaymentWorkflow>()
                .AddSingleton<UserProfileWorkflow>()