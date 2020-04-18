using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Workflows;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StoryController : UserBasedController
    {
        private CompanyWorkflow CompanyWorkflow { get; }

        public StoryController(CompanyWorkflow companyWorkflow)
        {
            CompanyWorkflow = companyWorkflow;
        }

        // GET api/story?id=MSFT
        [HttpGet]
        public Task<ActionResult<Story>> GetStory([FromQuery]string id)
            => UnpackAsync(CompanyWorkflow.GetStoryAsync(UserId, id));

        // POST api/story
        [HttpPost]
        public Task<ActionResult<bool>> SaveStory([FromBody] Story company)
            => UnpackAsync(CompanyWorkflow.SaveStoryAsync(UserId, company));

        // DELETE api/story?id={}
        [HttpDelete]
        public Task<ActionResult<bool>> Delete([FromQuery] string id)
            => UnpackAsync(CompanyWorkflow.DeleteStoryAsync(UserId, id));
    }
}
