using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Workflows;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PaymentController : UserBasedController
    {
        private PaymentWorkflow PaymentWorkflow { get; }
        public ILogger Logger { get; }

        public PaymentController(PaymentWorkflow paymentWorkflow, ILogger<PaymentController> logger)
        {
            PaymentWorkflow = paymentWorkflow;
            Logger = logger;
        }

        // GET api/payment
        [HttpGet]
        public Task<ActionResult<IEnumerable<PaymentProcessed>>> Get() 
            => UnpackAsync(PaymentWorkflow.GetPaymentsAsync(UserId));
    }
}