using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.User;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface IUserProfileRepository
    {
        Task<UserProfile> GetProfileAsync(string userId);
        Task SaveProfileAsync(string userId, UserProfile profile);
    }
}
