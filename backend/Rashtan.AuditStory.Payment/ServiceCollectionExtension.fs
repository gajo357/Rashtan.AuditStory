namespace Rashtan.AuditStory.Payment

open System.Runtime.CompilerServices
open Microsoft.Extensions.DependencyInjection

[<Extension>]
type ServiceCollectionExtension =
    [<Extension>]
    static member RegisterPaymentGizmo(services: IServiceCollection) =
        services.AddSingleton<IPaymentGizmo, PaymentGizmo>()
