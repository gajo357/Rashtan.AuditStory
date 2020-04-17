using Rashtan.AuditStory.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface ICountriesRepository
    {
        Task<IEnumerable<Country>> GetCountriesAsync();
        Task<bool> SaveCountriesAsync(IEnumerable<Country> countries);
    }
}
