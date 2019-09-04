using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Payment;
using Microsoft.FSharp.Core;

namespace Rashtan.AuditStory.PaymentGizmo
{
    public interface IPaymentGizmo
    {
        Task<string> GenerateNonceAsync();
        Task<FSharpResult<PaymentProcessed, string>> SaleAsync(PaymentToProcess paymentToProcess);
    }
}
