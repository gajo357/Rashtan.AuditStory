using Microsoft.Extensions.DependencyInjection;

namespace Rashtan.AuditStory.PaymentGizmo
{
    public static class ServiceCollectionExtension
    {
        public static void RegisterPaymentGizmo(this IServiceCollection services)
        {
            services.AddSingleton<IPaymentGizmo, PaymentGizmo>();
        }
    }
}
