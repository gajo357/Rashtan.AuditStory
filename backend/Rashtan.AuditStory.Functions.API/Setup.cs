using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rashtan.AuditStory.Functions.API.Utils;
using Rashtan.AuditStory.MongoRepository;
using Rashtan.AuditStory.Workflows;

[assembly: FunctionsStartup(typeof(Rashtan.AuditStory.Functions.API.Startup))]

namespace Rashtan.AuditStory.Functions.API
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var serviceProvider = builder.Services.BuildServiceProvider();
            var configurationRoot = serviceProvider.GetService<IConfiguration>();

            builder.Services
                .AddHttpClient()
                .AddSingleton(configurationRoot)
                .AddSingleton<TokenAuthenticator>()
                .AddSingleton<FunctionAppAuth0Authenticator>()
                .RegisterRepositoryServices()
                .RegisterWorkflows();
        }
    }
}
