using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Workflows;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CountryController : UserBasedController
    {
        private CountryWorkflow CountryWorkflow { get; }

        public CountryController(CountryWorkflow countryWorkflow)
        {
            CountryWorkflow = countryWorkflow;
        }

        // GET api/country
        [HttpGet]
        public Task<ActionResult<IEnumerable<Country>>> Get()
            => UnpackAsync(CountryWorkflow.GetCountriesAsync());

        // POST api/country
        [HttpPost]
        public Task<ActionResult<bool>> Post(IEnumerable<Country> countries)
            => UnpackAsync(CountryWorkflow.SaveCountriesAsync(countries));
    }
}