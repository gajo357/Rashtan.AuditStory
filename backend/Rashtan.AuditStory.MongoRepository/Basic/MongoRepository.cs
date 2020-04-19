using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public class MongoRepository<TEntity> : IMongoRepository<TEntity> 
    {
        protected readonly IMongoCollection<TEntity> Collection;

        protected MongoRepository(IMongoCollection<TEntity> collection)
        {
            Collection = collection;
        }

        public virtual Task AddAsync(TEntity obj) => Collection.InsertOneAsync(obj);

        public virtual async Task<TEntity> GetByIdAsync(Guid id)
        {
            var data = await Collection.FindAsync(Builders<TEntity>.Filter.Eq("_id", id));
            return data.FirstOrDefault();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            var result = await Collection.FindAsync(Builders<TEntity>.Filter.Empty);
            return await result.ToListAsync();
        }

        public virtual async Task<bool> SaveAllAsync(IEnumerable<TEntity> entities)
        {
            var result = await Collection.DeleteManyAsync(Builders<TEntity>.Filter.Empty);

            var chunkSize = 20;
            foreach (var g in entities
                .Select((x, i) => new { Index = i, Value = x })
                .GroupBy(x => x.Index / chunkSize)
                .Select(x => x.Select(v => v.Value)))
            {
                await Collection.InsertManyAsync(g,
                    new InsertManyOptions { BypassDocumentValidation = true, IsOrdered = false });
                await Task.Delay(1000);
            }

            return result.IsAcknowledged;
        }
    }
}
