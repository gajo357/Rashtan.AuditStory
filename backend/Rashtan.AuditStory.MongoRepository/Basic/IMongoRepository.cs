using Rashtan.AuditStory.Repository.Interface.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public interface IMongoRepository<TEntity> 
        where TEntity : IDocument        
    {
        Task AddAsync(TEntity obj);
        Task<TEntity> GetByIdAsync(Guid id);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task UpdateAsync(TEntity obj);
        Task RemoveAsync(Guid id);
    }
}
