using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository
{
    public class UserProfileRepository : UserDataRepository<UserProfile>, IUserProfileRepository
    {
        public UserProfileRepository(IMongoContext context) : base(context)
        {
        }

        public Task<UserProfile> GetProfileAsync(string userId) => GetOneAsync<string>(userId);

        public Task SaveProfileAsync(string userId, UserProfile profile) 
            => AddOrUpdateOneAsync(userId, profile, CreateDataFilter($"{nameof(UserProfile.Email)}", profile.Email));
    }
}
