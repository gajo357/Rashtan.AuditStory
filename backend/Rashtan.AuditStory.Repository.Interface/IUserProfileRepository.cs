using System.Threading.Tasks;
using Rashtan.AuditStory.Dto;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface IUserProfileRepository
    {
        Task<UserProfile?> GetProfileAsync(string userId);
        Task SaveProfileAsync(string userId, UserProfile profile);
    }
}
