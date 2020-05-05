using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rashtan.AuditStory.MongoRepository;
using Rashtan.AuditStory.PaypalPayment;
using Rashtan.AuditStory.Workflows;
using System.Net.Http;

[assembly: FunctionsStartup(typeof(Rashtan.AuditStory.Functions.Startup))]

namespace Rashtan.AuditStory.Functions
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
                .RegisterPaypalServices()
                .RegisterRepositoryServices()
                .RegisterWorkflows();
        }
    }
}
