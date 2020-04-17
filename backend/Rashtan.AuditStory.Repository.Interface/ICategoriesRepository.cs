using Rashtan.AuditStory.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface ICategoriesRepository
    {
        Task<IEnumerable<Category>> GetCategoriesAsync(string userId);
        Task SaveCategoryAsync(string userId, Category category);
        Task<bool> SaveCategoriesAsync(string userId, IEnumerable<Category> categories);
    }
}
