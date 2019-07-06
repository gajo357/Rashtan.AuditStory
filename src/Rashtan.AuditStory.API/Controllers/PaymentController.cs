using Braintree;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Rashtan.AuditStory.Dto;
using System;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Payment;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PaymentController : ControllerBase
    {
        private BraintreeGateway Gateway { get; }
        public PaymentController(IConfiguration configuration)
        {
            Gateway = new BraintreeGateway
            {
                Environment = Braintree.Environment.SANDBOX,
                MerchantId = configuration["Payment:MerchantId"],
                PublicKey = configuration["Payment:PublicKey"],
                PrivateKey = configuration["Payment:PrivateKey"]
            };
        }

        // GET api/payment
        [HttpGet]
        public async Task<ActionResult<string>> Get() => await Gateway.ClientToken.GenerateAsync();

        // POST api/payment?nonce=alksdjf_asd
        [HttpPost]
        public async Task<ActionResult<PaymentProcessed>> Post([FromBody] PaymentToProcess payment)
        {
            if (payment.Amount <= 0)
                return await StartFreeTrialAsync();

            var request = new TransactionRequest
            {
                Amount = payment.Amount,
                PaymentMethodNonce = payment.Nonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };

            var result = await Gateway.Transaction.SaleAsync(request);
            if (result.IsSuccess())
            {
                return Ok(new PaymentProcessed {
                    TransactionId = result.Target.AuthorizedTransactionId,
                    Amount = payment.Amount,
                    PayedUntil = DateTime.Today.AddYears(1).AddDays(1)
                });
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        private Task<PaymentProcessed> StartFreeTrialAsync()
        {
            return Task.FromResult(new PaymentProcessed { PayedUntil = DateTime.Today.AddDays(31), Amount = 0M });
        }
    }
}
