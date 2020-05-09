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
    public class UserStatusController : UserBasedController
    {
        private IUserStatusWorkflow UserStatusWorkflow { get; }
        public UserStatusController(IUserStatusWorkflow userStatusWorkflow)
        {
            UserStatusWorkflow = userStatusWorkflow;
        }

        // GET api/userstatus
        [HttpGet]
        public Task<ActionResult<UserStatus>> Get()
            => UnpackAsync(UserStatusWorkflow.GetUserStatusAsync(UserId));
    }
}