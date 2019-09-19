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
    public class PaymentController : UserBasedController
    {
        private Workflows.PaymentWorkflow PaymentWorkflow { get; }

        public PaymentController(Workflows.PaymentWorkflow paymentWorkflow)
        {
            PaymentWorkflow = paymentWorkflow;
        }

        // GET api/payment
        [HttpGet]
        public async Task<ActionResult<string>> Get() => await PaymentWorkflow.GenerateTokenAsync();

        // POST api/payment
        [HttpPost]
        public async Task<ActionResult<PaymentProcessed>> Post([FromBody] PaymentToProcess payment) 
            => Unpack(await PaymentWorkflow.SavePaymentAsync(UserId, payment));        
    }
}
