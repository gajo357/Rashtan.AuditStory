using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Rashtan.AuditStory.Dto.Payment;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PricingController : ControllerBase
    {
        // GET api/pricing
        [HttpGet]
        public ActionResult<PricingTier[]> Get()
        {
            return demoTiers;
        }
    }
}
