﻿using MongoDB.Driver;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository
{
    public class CompanyStoryRepository : UserDataRepository<Story>, ICompanyStoryRepository
    {
        public CompanyStoryRepository(IMongoContext context) : base(context)
        {
        }

        public Task<Story> GetStoryAsync(string userId, Guid id) 
            => GetOneAsync(userId, CreateDataFilter($"{nameof(Story.Id)}", id));
        public Task<bool> DeleteStoryAsync(string userId, Guid id) 
            => DeleteAsync(userId, CreateDataFilter($"{nameof(Story.Id)}", id));
        public Task SaveStoryAsync(string userId, Story story) 
            => AddOrUpdateOneAsync(userId, story, CreateDataFilter($"{nameof(Story.Id)}", story.Id));

        public async Task<IEnumerable<Profile>> GetQuickInfosAsync(string userId)
        {
            var result = Collection.Find(s => s.UserId == userId);
            return await result.Project(x => x.Data.Profile).ToListAsync();
        }
    }
}
