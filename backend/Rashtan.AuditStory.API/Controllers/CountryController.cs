using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Workflows;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CountryController : UserBasedController
    {
        private CountryWorkflow CountryWorkflow { get; }

        public CountryController(CountryWorkflow countryWorkflow)
        {
            CountryWorkflow = countryWorkflow;
        }

        // GET api/country/countries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> Countries()
            => Unpack(await CountryWorkflow.GetCountriesAsync());

        // GET api/country/Currencies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Currency>>> Currencies()
            => Unpack(await CountryWorkflow.GetCurrenciesAsync());

        [HttpPost]
        public async Task<ActionResult<bool>> Countries(IEnumerable<Country> countries)
            => Unpack(await CountryWorkflow.SaveCountriesAsync(countries));
    }
}
