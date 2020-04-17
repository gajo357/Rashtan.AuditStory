using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Repositories
{
    internal class CategoriesRepository : UserDataRepository<Category>, ICategoriesRepository
    {
        public CategoriesRepository(IMongoContext context) : base(context)
        {
        }

        public Task<IEnumerable<Category>> GetCategoriesAsync(string userId) => GetAllAsync(userId);

        public Task SaveCategoryAsync(string userId, Category category) => AddAsync(userId, category);

        public Task<bool> SaveCategoriesAsync(string userId, IEnumerable<Category> categories) => SaveAllAsync(userId, categories);
    }
}
