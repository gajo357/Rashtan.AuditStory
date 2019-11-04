using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Workflows;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CompanyController : UserBasedController
    {
        private CompanyWorkflow CompanyWorkflow { get; }

        public CompanyController(CompanyWorkflow companyWorkflow)
        {
            CompanyWorkflow = companyWorkflow;
        }

        // GET api/company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profile>>> GetProfiles() 
            => Unpack(await CompanyWorkflow.GetProfilesAsync<string>(UserId));

        // POST api/company
        [HttpPost]
        public async Task<ActionResult<Guid>> CreateProfile([FromBody] CompanyStoryCreate company)
            => Unpack(await CompanyWorkflow.CreateStoryAsync(UserId, company));
    }
}
