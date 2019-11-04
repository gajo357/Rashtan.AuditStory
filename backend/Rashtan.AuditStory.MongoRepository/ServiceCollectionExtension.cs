using Microsoft.Extensions.DependencyInjection;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;

namespace Rashtan.AuditStory.MongoRepository
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection RegisterRepositoryServices(this IServiceCollection services)
            => services.AddSingleton<IMongoContext, MongoContext>()
                .AddSingleton(typeof(IMongoRepository<>), typeof(MongoRepository<>))
                .AddSingleton<ICompanyStoryRepository, CompanyStoryRepository>()
                .AddSingleton<IUserProfileRepository, UserProfileRepository>();
    }
}
