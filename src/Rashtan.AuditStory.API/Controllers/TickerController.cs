using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using static Rashtan.AuditStory.Dto.Company;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TickerController : ControllerBase
    {
        // GET api/ticker/MSFT
        [HttpGet("{ticker}")]
        public ActionResult<IEnumerable<CompanyProfile>> Get(string ticker)
        {
            // call the API to get matching companies

            return new[] 
            {
                new CompanyProfile { Name = "Micron", Ticker = "MU", MarketCap = 50000000000, NumberOfShares = 1000000 },
                new CompanyProfile { Name = "Microsoft", Ticker = "MSFT", MarketCap = 500000000000, NumberOfShares = 10000000 },
            };
        }
    }
}
