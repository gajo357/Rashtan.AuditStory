using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using System;
using System.Threading.Tasks;
using Rashtan.AuditStory.Dto;

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

        private Task<PaymentProcessed> StartFreeTrialAsync()
        {
            return Task.FromResult(new PaymentProcessed { PayedUntil = DateTime.Today.AddDays(31), Amount = 0M });
        }
    }
}
