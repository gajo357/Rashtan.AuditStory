using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Workflows;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CurrencyController : UserBasedController
    {
        private CountryWorkflow CountryWorkflow { get; }

        public CurrencyController(CountryWorkflow countryWorkflow)
        {
            CountryWorkflow = countryWorkflow;
        }

        // GET api/currency
        [HttpGet]
        public Task<ActionResult<IEnumerable<Currency>>> Get()
            => UnpackAsync(CountryWorkflow.GetCurrenciesAsync());
    }
}