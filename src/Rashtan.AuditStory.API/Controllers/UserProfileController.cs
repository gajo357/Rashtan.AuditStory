using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using static Rashtan.AuditStory.Dto.User;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        // GET api/userprofile
        [HttpGet]
        public ActionResult<UserProfile> Get()
        {
            var currentUser = HttpContext.User;

            return new UserProfile
            {
                BasicInfo = new UserProfileCreate
                {
                    Name = "Microsoft",
                    Email = "MSFT"
                },
                PaymentInfo = new Dto.Payment.PaymentInfo
                {
                    IsTrial = true,
                    PayedUntil = DateTime.Today
                }
            };
        }

        // POST api/userprofile
        [HttpPost]
        public void Post([FromBody] UserProfile profile)
        {
            // save to database
        }
    }
}
