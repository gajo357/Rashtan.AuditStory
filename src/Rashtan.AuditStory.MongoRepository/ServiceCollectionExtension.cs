using Microsoft.Extensions.DependencyInjection;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;

namespace Rashtan.AuditStory.MongoRepository
{
    public static class ServiceCollectionExtension
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddSingleton<IMongoContext, MongoContext>();
            services.AddSingleton(typeof(IMongoRepository<>), typeof(MongoRepository<>));
            services.AddSingleton<ICompanyProfileRepository, CompanyProfileRepository>();
            services.AddSingleton<IFolderRepository, FolderRepository>();
            services.AddSingleton<IPaymentRepository, PaymentRepository>();
            services.AddSingleton<IUserProfileRepository, UserProfileRepository>();
        }
    }
}
