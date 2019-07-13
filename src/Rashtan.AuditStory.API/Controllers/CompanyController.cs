using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using static Rashtan.AuditStory.Dto.Company;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        // GET api/company/MSFT
        [HttpGet("{ticker}")]
        public ActionResult<Company> Get(string ticker)
        {
            var Name = User.Identity.Name;
            var EmailAddress = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            return new Company()
            {
                Profile = new CompanyProfile("Micron", "MU", 100, 10),
            };
        }

        // GET api/companyprofile
        [HttpGet]
        public ActionResult<IEnumerable<CompanyProfile>> GetProfiles()
        {
            return new[]
            {
                new CompanyProfile { Name = "Micron", Ticker = "MU", MarketCap = 50 * 1e9 },
                new CompanyProfile { Name = "Microsoft", Ticker = "MSFT", MarketCap = 500 * 1e9 }
            };
        }

        // POST api/company
        [HttpPost]
        public ActionResult<bool> Post([FromBody] Company company)
        {
            // save to database
            return true;
        }

        // DELETE api/company/MSFT
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] string ticker)
        {
            // delete from database
            return true;
        }
    }
}
