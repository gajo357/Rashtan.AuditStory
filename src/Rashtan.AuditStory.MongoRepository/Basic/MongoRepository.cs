using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public class MongoRepository<TEntity> : IMongoRepository<TEntity> 
        where TEntity: IDocument
    {
        protected readonly IMongoCollection<TEntity> DbSet;

        protected MongoRepository(IMongoContext context)
        {
            DbSet = context.GetCollection<TEntity>();
        }

        public virtual async Task Add(TEntity obj) => await DbSet.InsertOneAsync(obj);

        public virtual async Task<TEntity> GetById(Guid id)
        {
            var data = await DbSet.FindAsync(Builders<TEntity>.Filter.Eq("_id", id));
            return data.FirstOrDefault();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            var all = await DbSet.FindAsync(Builders<TEntity>.Filter.Empty);
            return all.ToList();
        }

        public virtual async Task Update(TEntity obj) => await DbSet.ReplaceOneAsync(Builders<TEntity>.Filter.Eq("_id", obj.Id), obj);

        public virtual async Task Remove(Guid id) => await DbSet.DeleteOneAsync(Builders<TEntity>.Filter.Eq("_id", id));
    }
}
