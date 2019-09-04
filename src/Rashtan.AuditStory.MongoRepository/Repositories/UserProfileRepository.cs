using Rashtan.AuditStory.DbModel;
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

        public async Task<UserProfile> GetProfileAsync(string userId) => await GetOneAsync(userId);

        public async Task SaveProfileAsync(string userId, UserProfile profile) => await AddAsync(userId, profile);
    }
}
