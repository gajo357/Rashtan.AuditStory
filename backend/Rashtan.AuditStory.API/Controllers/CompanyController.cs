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
        public Task<ActionResult<IEnumerable<StoryQuickInfo>>> GetCompanies() 
            => UnpackAsync(CompanyWorkflow.GetQuickInfosAsync(UserId));

        // POST api/company
        [HttpPost]
        public Task<ActionResult<Guid>> CreateNewStory([FromBody] CompanyStoryCreate company)
            => UnpackAsync(CompanyWorkflow.CreateStoryAsync(UserId, company));
    }
}
