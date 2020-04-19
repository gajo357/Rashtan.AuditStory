using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Rashtan.AuditStory.Dto;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface ICompanyStoryRepository
    {
        Task<IEnumerable<StoryQuickInfo>> GetQuickInfosAsync(string userId);
        
        Task<Story?> GetStoryAsync(string userId, Guid id);
        Task SaveStoryAsync(string userId, Story profile);
        Task<bool> DeleteStoryAsync(string userId, Guid id);
    }
}
