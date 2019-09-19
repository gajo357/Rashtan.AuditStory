using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FreeTrialController : UserBasedController
    {
        private Workflows.PaymentWorkflow PaymentWorkflow { get; }

        public FreeTrialController(Workflows.PaymentWorkflow paymentWorkflow)
        {
            PaymentWorkflow = paymentWorkflow;
        }

        [HttpPost]
        public async Task<ActionResult<PaymentProcessed>> Post() 
            => Unpack(await PaymentWorkflow.StartFreeTrialAsync(UserId));
    }
}
