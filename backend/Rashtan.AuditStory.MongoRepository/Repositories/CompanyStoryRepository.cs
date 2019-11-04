using MongoDB.Driver;
using Rashtan.AuditStory.DbModel;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository
{
    public class CompanyStoryRepository : UserDataRepository<Story>, ICompanyStoryRepository
    {
        public CompanyStoryRepository(IMongoContext context) : base(context)
        {
        }

        public async Task<Story> GetStoryAsync(string userId, Guid id) 
            => await GetOneAsync(userId, CreateDataFilter($"{nameof(Story.Profile)}.{nameof(Profile.Id)}", id));
        public async Task<bool> DeleteStoryAsync(string userId, Guid id) 
            => await DeleteAsync(userId, CreateDataFilter($"{nameof(Story.Profile)}.{nameof(Profile.Id)}", id));
        public async Task SaveStoryAsync(string userId, Story profile) => await AddAsync(userId, profile);

        public async Task<IEnumerable<Profile>> GetProfilesAsync(string userId)
        {
            var result = Collection.Find(s => s.UserId == userId);
            return await result.Project(x => x.Data.Profile).ToListAsync();
        }
    }
}
