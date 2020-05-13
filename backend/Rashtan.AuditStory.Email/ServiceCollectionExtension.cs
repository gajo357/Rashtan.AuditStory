using Microsoft.Extensions.DependencyInjection;

namespace Rashtan.AuditStory.Email
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection RegisterEmailServices(this IServiceCollection services)
            => services.AddSingleton<IEmailService, EmailService>();
    }
}
