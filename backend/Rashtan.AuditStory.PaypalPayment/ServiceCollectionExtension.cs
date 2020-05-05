using Microsoft.Extensions.DependencyInjection;

namespace Rashtan.AuditStory.PaypalPayment
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection RegisterPaypalServices(this IServiceCollection services)
            => services.AddSingleton<IPaypalService, PaypalService>();
    }
}
