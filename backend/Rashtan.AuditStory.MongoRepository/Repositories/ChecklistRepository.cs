using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using Rashtan.AuditStory.Repository.Interface.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Repositories
{
    internal class ChecklistRepository : MongoRepository<Document<ChecklistItem>>, IChecklistRepository
    {
        public ChecklistRepository(IMongoContext context) 
            : base(context.GetDataCollection<ChecklistItem>())
        {
        }

        public async Task<IEnumerable<ChecklistItem>> GetChecklistItemsAsync()
        {
            var list = await GetAllAsync();

            return list.Select(s => s.Data);
        }

        public Task<bool> SaveItemsAsync(IEnumerable<ChecklistItem> items)
            => SaveAllAsync(items.Select(s => new Document<ChecklistItem> { Data = s }));
    }
}
