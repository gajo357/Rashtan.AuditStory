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
        public Task<ActionResult<IEnumerable<Country>>> Countries()
            => UnpackAsync(CountryWorkflow.GetCountriesAsync());

        // GET api/country/Currencies
        [HttpGet]
        public Task<ActionResult<IEnumerable<Currency>>> Currencies()
            => UnpackAsync(CountryWorkflow.GetCurrenciesAsync());

        [HttpPost]
        public Task<ActionResult<bool>> Countries(IEnumerable<Country> countries)
            => UnpackAsync(CountryWorkflow.SaveCountriesAsync(countries));
    }
}
