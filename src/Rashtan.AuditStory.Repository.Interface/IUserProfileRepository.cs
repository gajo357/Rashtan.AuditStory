using System.Threading.Tasks;
using Rashtan.AuditStory.DbModel;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface IUserProfileRepository
    {
        Task<UserProfile> GetProfileAsync(string userId);
        Task SaveProfileAsync(string userId, UserProfile profile);
    }
}
