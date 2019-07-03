using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using static Rashtan.AuditStory.Dto.Company;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CompanyProfileController : ControllerBase
    {
        // GET api/companyprofile
        [HttpGet]
        public ActionResult<IEnumerable<CompanyProfile>> Get()
        {
            return new[]
            {
                new CompanyProfile { Name = "Micron", Ticker = "MU" },
                new CompanyProfile { Name = "Microsoft", Ticker = "MSFT" }
            };
        }

        // GET api/companyprofile/MSFT
        [HttpGet("{ticker}")]
        public ActionResult<CompanyProfile> Get(string ticker)
        {
            return new CompanyProfile { Name = "Micron", Ticker = "MU" };
        }
    }
}
