using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.Common;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Utils
{
    public class UserBasedController : ControllerBase
    {

        //var Name = User.Identity.Name;
        //var EmailAddress = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

        protected string UserId => User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        protected string UserEmail => User.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value;

        protected ActionResult<T> Unpack<T>(CsResult<T> result)
        {
            if (result.IsError)
                return BadRequest(result.Error);

            return Ok(result.Result);
        }

        protected async Task<ActionResult<T>> UnpackAsync<T>(Task<CsResult<T>> task)
        {
            try
            {
                return Unpack(await task);
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
