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
    public class CompanyController : UserBasedController
    {
        private CompanyWorkflow CompanyProfileRepository { get; }

        public CompanyController(CompanyWorkflow companyProfileRepository)
        {
            CompanyProfileRepository = companyProfileRepository;
        }

        // GET api/company/profile?ticker=MSFT
        [HttpGet]
        public async Task<ActionResult<CompanyProfile>> Profile([FromQuery]string ticker) 
            => Unpack(await CompanyProfileRepository.GetProfileAsync(UserId, ticker));

        // GET api/company/getprofiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyProfile>>> GetProfiles() 
            => Unpack(await CompanyProfileRepository.GetProfilesAsync(UserId));

        // POST api/company
        [HttpPost]
        public async Task<ActionResult<CompanyProfile>> CreateProfile([FromBody] CompanyProfile company)
            => Unpack(await CompanyProfileRepository.CreateProfileAsync(UserId, company));

        // DELETE api/company/MSFT
        [HttpDelete]
        public async Task<ActionResult<bool>> Delete([FromQuery] string ticker) 
            => Unpack(await CompanyProfileRepository.DeleteProfileAsync(UserId, ticker));
    }
}
