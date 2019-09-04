using Braintree;
using Microsoft.Extensions.Configuration;
using Microsoft.FSharp.Core;
using System;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Payment;

namespace Rashtan.AuditStory.PaymentGizmo
{
    internal class PaymentGizmo : IPaymentGizmo
    {
        private BraintreeGateway Gateway { get; }

        public PaymentGizmo(IConfiguration configuration)
        {
            var payment = configuration.GetSection("Payment");

            Gateway = new BraintreeGateway
            {
                Environment = Braintree.Environment.ParseEnvironment(payment[nameof(BraintreeGateway.Environment)]),
                MerchantId = payment[nameof(BraintreeGateway.MerchantId)],
                PublicKey = payment[nameof(BraintreeGateway.PublicKey)],
                PrivateKey = payment[nameof(BraintreeGateway.PrivateKey)]
            };
        }

        public async Task<string> GenerateNonceAsync() => await Gateway.ClientToken.GenerateAsync();

        public async Task<FSharpResult<PaymentProcessed, string>> SaleAsync(PaymentToProcess payment)
        {
            var request = new TransactionRequest
            {
                Amount = payment.Amount,
                PaymentMethodNonce = payment.Nonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };

            try
            {
                var result = await Gateway.Transaction.SaleAsync(request);
                if (result.IsSuccess())
                {
                    var paymentProcessed = new PaymentProcessed
                    {
                        TransactionId = result.Target.AuthorizedTransactionId,
                        Amount = payment.Amount,
                        PayedUntil = DateTime.Today.AddDays(payment.Length)
                    };

                    return FSharpResult<PaymentProcessed, string>.NewOk(paymentProcessed);
                }
                else
                {
                    return FSharpResult<PaymentProcessed, string>.NewError(result.Message);
                }
            }
            catch (Exception e)
            {   
                return FSharpResult<PaymentProcessed, string>.NewError(e.Message);
            }            
        }
    }
}
