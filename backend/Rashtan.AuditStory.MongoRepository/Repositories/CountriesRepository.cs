using MongoDB.Driver;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Repositories
{
    internal class CountriesRepository : MongoRepository<Country>, ICountriesRepository
    {
        public CountriesRepository(IMongoContext context)
            : base(context.GetCollection<Country>())
        {
        }

        public async Task<IEnumerable<Country>> GetCountriesAsync()
        {
            var result = await Collection.FindAsync(Builders<Country>.Filter.Empty);
            var list = await result.ToListAsync();

            return list;
        }
        public Task<bool> SaveCountriesAsync(IEnumerable<Country> countries) => SaveAllAsync(countries);
    }
}
