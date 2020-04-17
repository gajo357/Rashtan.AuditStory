﻿using MongoDB.Driver;
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

        public virtual async Task AddAsync(TEntity obj) => await Collection.InsertOneAsync(obj);

        public virtual async Task<TEntity> GetByIdAsync(Guid id)
        {
            var data = await Collection.FindAsync(Builders<TEntity>.Filter.Eq("_id", id));
            return data.FirstOrDefault();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            var all = await Collection.FindAsync(Builders<TEntity>.Filter.Empty);
            return all.ToList();
        }

        public virtual async Task<bool> SaveAllAsync(IEnumerable<TEntity> entities)
        {
            var result = await Collection.DeleteManyAsync(Builders<TEntity>.Filter.Empty);
            await Collection.InsertManyAsync(entities);

            return result.IsAcknowledged;
        }

        public virtual async Task UpdateAsync(TEntity obj) => await Collection.ReplaceOneAsync(Builders<TEntity>.Filter.Eq("_id", obj.Id), obj);

        public virtual async Task RemoveAsync(Guid id) => await Collection.DeleteOneAsync(Builders<TEntity>.Filter.Eq("_id", id));
    }
}
