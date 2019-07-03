using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using static Rashtan.AuditStory.Dto.Company;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
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
