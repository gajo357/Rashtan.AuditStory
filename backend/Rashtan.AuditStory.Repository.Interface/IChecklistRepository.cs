using Rashtan.AuditStory.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface IChecklistRepository
    {
        Task<IEnumerable<ChecklistItem>> GetChecklistItemsAsync();
        Task<bool> SaveItemsAsync(IEnumerable<ChecklistItem> items);
    }
}
