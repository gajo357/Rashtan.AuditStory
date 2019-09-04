using System.Collections.Generic;
using System.Threading.Tasks;
using Rashtan.AuditStory.DbModel;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface ICompanyProfileRepository
    {
        Task<CompanyProfile> GetProfileAsync(string userId, string ticker);
        Task<IEnumerable<CompanyProfile>> GetProfilesAsync(string userId);
        Task<IEnumerable<CompanyProfile>> GetProfilesInFolderAsync(string userId, string folderName);

        Task CreateProfileAsync(string userId, CompanyProfile profile);
        Task<bool> DeleteProfileAsync(string userId, string ticker);
    }
}
