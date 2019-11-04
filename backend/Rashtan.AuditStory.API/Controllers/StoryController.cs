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
        public async Task<ActionResult<Story>> GetStory([FromQuery]string id)
            => Unpack(await CompanyWorkflow.GetStoryAsync(UserId, id));

        // POST api/story
        [HttpPost]
        public async Task<ActionResult<bool>> SaveStory([FromBody] Story company)
            => Unpack(await CompanyWorkflow.SaveStoryAsync(UserId, company));

        // DELETE api/story?id={}
        [HttpDelete]
        public async Task<ActionResult<bool>> Delete([FromQuery] string id)
            => Unpack(await CompanyWorkflow.DeleteStoryAsync(UserId, id));
    }
}
