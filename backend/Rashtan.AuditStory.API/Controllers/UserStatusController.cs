using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Common;
using Rashtan.AuditStory.Workflows;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserStatusController : UserBasedController
    {
        private UserProfileWorkflow UserProfileWorkflow { get; }
        public UserStatusController(UserProfileWorkflow userProfileWorkflow)
        {
            UserProfileWorkflow = userProfileWorkflow;
        }

        // GET api/userstatus
        [HttpGet]
        public async Task<ActionResult<UserStatus>> Get() => await UserProfileWorkflow.GetUserStatusAsync(UserId);
    }
}
