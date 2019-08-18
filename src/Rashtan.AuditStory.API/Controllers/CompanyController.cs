using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Company;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        private ICompanyProfileRepository CompanyProfileRepository { get; }

        public CompanyController(ICompanyProfileRepository companyProfileRepository)
        {
            CompanyProfileRepository = companyProfileRepository;
        }

        // GET api/company/profile?ticker=MSFT
        [HttpGet]
        public async Task<ActionResult<CompanyProfile>> Profile([FromQuery]string ticker) => await CompanyProfileRepository.GetProfileAsync(this.UserId(), ticker);

        // GET api/company/getprofiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyProfile>>> GetProfiles() => Ok(await CompanyProfileRepository.GetProfilesAsync(this.UserId()));

        // POST api/company
        [HttpPost]
        public async Task<ActionResult<string>> CreateProfile([FromBody] CompanyProfile company)
        {
            await CompanyProfileRepository.CreateProfileAsync(this.UserId(), company);
            // save to database
            return company.Ticker;
        }

        // DELETE api/company/MSFT
        [HttpDelete]
        public async Task<ActionResult<bool>> Delete([FromQuery] string ticker) => await CompanyProfileRepository.DeleteProfileAsync(this.UserId(), ticker);
    }
}
