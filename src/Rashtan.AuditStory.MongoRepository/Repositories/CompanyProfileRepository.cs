using Rashtan.AuditStory.DbModel;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository
{
    public class CompanyProfileRepository : UserDataRepository<CompanyProfile>, ICompanyProfileRepository
    {
        public CompanyProfileRepository(IMongoContext context) : base(context)
        {
        }

        public async Task CreateProfileAsync(string userId, CompanyProfile profile) => await AddAsync(userId, profile);

        public async Task<bool> DeleteProfileAsync(string userId, string ticker) => await DeleteAsync(userId, CreateDataFilter(nameof(CompanyProfile.Ticker), ticker));

        public async Task<CompanyProfile> GetProfileAsync(string userId, string ticker) => await GetOneAsync(userId, CreateDataFilter(nameof(CompanyProfile.Ticker), ticker));

        public async Task<IEnumerable<CompanyProfile>> GetProfilesAsync(string userId) => await GetAllAsync(userId);

        public async Task<IEnumerable<CompanyProfile>> GetProfilesInFolderAsync(string userId, string folderName) => await GetAllAsync(userId, CreateDataFilter(nameof(CompanyProfile.Folder), folderName));
    }
}
