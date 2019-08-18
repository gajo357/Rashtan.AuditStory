using Braintree;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Repository.Interface;
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
        private IPaymentRepository PaymentRepository { get; }

        public PaymentController(IConfiguration configuration, IPaymentRepository paymentRepository)
        {
            Gateway = new BraintreeGateway
            {
                Environment = Braintree.Environment.SANDBOX,
                MerchantId = configuration["Payment:MerchantId"],
                PublicKey = configuration["Payment:PublicKey"],
                PrivateKey = configuration["Payment:PrivateKey"]
            };
            PaymentRepository = paymentRepository;
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
                var paymentProcessed = new PaymentProcessed
                {
                    TransactionId = result.Target.AuthorizedTransactionId,
                    Amount = payment.Amount,
                    PayedUntil = DateTime.Today.AddDays(payment.Length)
                };

                await PaymentRepository.SavePaymentAsync(this.UserId(), paymentProcessed);

                return paymentProcessed;
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
