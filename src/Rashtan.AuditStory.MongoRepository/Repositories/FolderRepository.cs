using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository
{
    public class FolderRepository : UserDataRepository<Folder.Folder>, IFolderRepository
    {
        public FolderRepository(IMongoContext context) : base(context)
        {
        }

        public async Task CreateFolderAsync(string userId, string folder) => await AddAsync(userId, new Folder.Folder { Name = folder });

        public async Task<IEnumerable<Folder.Folder>> GetFoldersAsync(string userId) => await GetAllAsync(userId);
    }
}
