using MongoDB.Driver;
using Rashtan.AuditStory.Repository.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public class MongoRepository<TEntity> : IMongoRepository<TEntity> 
        where TEntity: IDocument
    {
        protected readonly IMongoCollection<TEntity> Collection;

        protected MongoRepository(IMongoCollection<TEntity> collection)
        {
            Collection = collection;
        }

        public virtual async Task Add(TEntity obj) => await Collection.InsertOneAsync(obj);

        public virtual async Task<TEntity> GetById(Guid id)
        {
            var data = await Collection.FindAsync(Builders<TEntity>.Filter.Eq("_id", id));
            return data.FirstOrDefault();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            var all = await Collection.FindAsync(Builders<TEntity>.Filter.Empty);
            return all.ToList();
        }

        public virtual async Task Update(TEntity obj) => await Collection.ReplaceOneAsync(Builders<TEntity>.Filter.Eq("_id", obj.Id), obj);

        public virtual async Task Remove(Guid id) => await Collection.DeleteOneAsync(Builders<TEntity>.Filter.Eq("_id", id));
    }
}
