using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Repositories
{
    internal class CountriesRepository : UserDataRepository<Country>, ICountriesRepository
    {
        public CountriesRepository(IMongoContext context) : base(context)
        {
        }

        /// <summary>
        /// Countries are identical for all users, we we just fake the UserId
        /// </summary>
        private const string UserId = "";

        public Task<IEnumerable<Country>> GetCountriesAsync() => GetAllAsync(UserId);
        public Task<bool> SaveCountriesAsync(IEnumerable<Country> countries) => SaveAllAsync(UserId, countries);
    }
}
