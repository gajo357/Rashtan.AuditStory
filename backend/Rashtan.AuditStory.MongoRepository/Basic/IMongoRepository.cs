using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public interface IMongoRepository<TEntity> 
    {
        Task AddAsync(TEntity obj);
        Task<TEntity> GetByIdAsync(Guid id);
        Task<IEnumerable<TEntity>> GetAllAsync();
    }
}
