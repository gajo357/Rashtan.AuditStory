using System.Collections.Generic;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Folder;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface IFolderRepository
    {
        Task<IEnumerable<Folder>> GetFoldersAsync(string userId);
        Task CreateFolderAsync(string userId, string folder);
    }
}
