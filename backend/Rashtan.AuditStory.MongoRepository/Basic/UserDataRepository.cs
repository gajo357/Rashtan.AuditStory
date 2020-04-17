using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Rashtan.AuditStory.Repository.Interface.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public class UserDataRepository<TData> : MongoRepository<UserDocument<TData>>
        where TData: class
    {
        protected UserDataRepository(IMongoContext context) 
            : base(context.GetUserDataCollection<TData>())
        {
        }

        protected Task AddAsync(string userId, TData data) => AddAsync(new UserDocument<TData> { Data = data, UserId = userId });
        protected Task<bool> SaveAllAsync(string userId, IEnumerable<TData> data) 
            => SaveAllAsync(data.Select(d => new UserDocument<TData> { Data = d, UserId = userId }));

        protected async Task<bool> DeleteAsync<TFilterValue>(string userId, params DataFilter<TFilterValue>[] dataFilters)
        {
            var result = await Collection.DeleteOneAsync(BuildFilter(userId, dataFilters));
            return result.IsAcknowledged;
        }

        protected async Task<TData> GetOneAsync<TFilterValue>(string userId, params DataFilter<TFilterValue>[] dataFilters)
        {
            var result = await Collection.FindAsync(BuildFilter(userId, dataFilters));
            var data = await result.FirstOrDefaultAsync();

            return data?.Data;
        }

        protected async Task<IEnumerable<TData>> GetAllAsync(string userId, params DataFilter<string>[] dataFilters)
        {
            var result = await Collection.FindAsync(BuildFilter(userId, dataFilters));

            var list = await result.ToListAsync();
            return list.Select(s => s.Data).ToArray();
        }

        protected DataFilter<TValue> CreateDataFilter<TValue>(string field, TValue value) => new DataFilter<TValue>(field, value);

        protected FilterDefinition<UserDocument<TData>> BuildFilter<TFilterValue>(string userId, params DataFilter<TFilterValue>[] dataFilters)
        {
            var builder = Builders<UserDocument<TData>>.Filter;
            var filters = builder.Eq(p => p.UserId, userId);
            foreach (var d in dataFilters)
                filters &= builder.Eq($"{nameof(UserDocument<TData>.Data)}.{d.Field}", d.Value);

            return filters;
        }
    }
}
