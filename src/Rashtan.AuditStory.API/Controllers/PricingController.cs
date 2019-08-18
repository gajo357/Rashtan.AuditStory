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
            return DemoTiers;
        }

        private PricingTier[] DemoTiers { get; } = new[] {
          new PricingTier {
            Title = "Free trial",
            Subheader = "Usually start here",
            Amount = 0M,
            Length = 31,
            Star = false,
            Description = new [] {"All features included", "One month trial", "Support" },
            ButtonText = "Start free trial",
          },
          new PricingTier {
            Title = "Monthly",
            Subheader = "30% discount",
            Amount = 3.99M,
            Length = 31,
            Star = false,
            Description = new [] { "All features included", "Support" },
            ButtonText = "Get monthly"
          },
          new PricingTier {
            Title = "Yearly",
            Subheader = "50% discount",
            Amount = 29.99M,
            Length = 366,
            Star = true,
            Description = new [] { "All features included", "Support" },
            ButtonText = "Get yearly"
          }
        };
    }
}
