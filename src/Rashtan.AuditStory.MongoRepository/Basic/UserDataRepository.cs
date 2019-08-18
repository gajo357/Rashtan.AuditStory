using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Rashtan.AuditStory.MongoRepository.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public class UserDataRepository<TData> : MongoRepository<UserDocument<TData>>
        where TData: class
    {
        protected UserDataRepository(IMongoContext context) : base(context)
        {
        }

        protected async Task AddAsync(string userId, TData data) => await Add(new UserDocument<TData> { Data = data, UserId = userId });

        protected async Task<bool> DeleteAsync(string userId, params DataFilter<string>[] dataFilters)
        {
            var result = await DbSet.DeleteOneAsync(BuildFilter(userId, dataFilters));
            return result.IsAcknowledged;
        }

        protected async Task<TData> GetOneAsync(string userId, params DataFilter<string>[] dataFilters)
        {
            var result = await DbSet.FindAsync(BuildFilter(userId, dataFilters));
            var data = await result.FirstOrDefaultAsync();

            return data?.Data;
        }

        protected async Task<TData[]> GetAllAsync(string userId, params DataFilter<string>[] dataFilters)
        {
            var result = await DbSet.FindAsync(BuildFilter(userId, dataFilters));

            var list = await result.ToListAsync();
            return list.Select(s => s.Data).ToArray();
        }

        protected DataFilter<TValue> CreateDataFilter<TValue>(string field, TValue value) => new DataFilter<TValue>(field, value);

        private FilterDefinition<UserDocument<TData>> BuildFilter(string userId, params DataFilter<string>[] dataFilters)
        {
            var builder = Builders<UserDocument<TData>>.Filter;
            var filters = builder.Eq(p => p.UserId, userId);
            foreach (var d in dataFilters)
                filters &= builder.Eq($"{nameof(UserDocument<TData>.Data)}.{d.Field}", d.Value);

            return filters;
        }
    }
}
