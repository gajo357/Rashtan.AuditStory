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
    public class FolderController : UserBasedController
    {
        private CompanyWorkflow CompanyWorkflow { get; }

        public FolderController(CompanyWorkflow companyWorkflow)
        {
            CompanyWorkflow = companyWorkflow;
        }

        // GET api/folder/folders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Folders() 
            => Unpack(await CompanyWorkflow.GetFoldersAsync(UserId));

        // GET api/folder/companies?name=Wonderfull
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyProfile>>> Companies([FromQuery] string name)
            => Unpack(await CompanyWorkflow.GetProfilesInFolderAsync(UserId, name));
    }
}
