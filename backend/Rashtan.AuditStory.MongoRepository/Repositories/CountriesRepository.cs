using MongoDB.Driver;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using Rashtan.AuditStory.Repository.Interface.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Repositories
{
    internal class CountriesRepository : MongoRepository<Document<Country>>, ICountriesRepository
    {
        public CountriesRepository(IMongoContext context)
            : base(context.GetDataCollection<Country>())
        {
        }

        public async Task<IEnumerable<Country>> GetCountriesAsync()
        {
            var result = await Collection.FindAsync(Builders<Document<Country>>.Filter.Empty);
            var list = await result.ToListAsync();

            return list.Select(s => s.Data);
        }
        public Task<bool> SaveCountriesAsync(IEnumerable<Country> countries) 
            => SaveAllAsync(countries.Select(s => new Document<Country> { Data = s }));
    }
}
