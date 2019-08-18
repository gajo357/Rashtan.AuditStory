using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Repository.Interface;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.User;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private IUserProfileRepository UserProfileRepository { get; }
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            UserProfileRepository = userProfileRepository;
        }

        // GET api/userprofile
        [HttpGet]
        public async Task<ActionResult<UserProfile>> Get() => await UserProfileRepository.GetProfileAsync(this.UserId());

        // POST api/userprofile
        [HttpPost]
        public async Task Post([FromBody] UserProfile profile) => await UserProfileRepository.SaveProfileAsync(this.UserId(), profile);
    }
}
