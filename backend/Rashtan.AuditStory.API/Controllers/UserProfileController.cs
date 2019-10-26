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
    public class UserProfileController : UserBasedController
    {
        private UserProfileWorkflow UserProfileWorkflow { get; }
        public UserProfileController(UserProfileWorkflow userProfileWorkflow)
        {
            UserProfileWorkflow = userProfileWorkflow;
        }

        // GET api/userprofile
        [HttpGet]
        public async Task<ActionResult<UserProfile>> Get() => Unpack(await UserProfileWorkflow.GetProfileAsync<string>(UserId));

        // POST api/userprofile
        [HttpPost]
        public async Task Post([FromBody] UserProfile profile) => Unpack(await UserProfileWorkflow.SaveProfileAsync(UserId, profile));
    }
}
