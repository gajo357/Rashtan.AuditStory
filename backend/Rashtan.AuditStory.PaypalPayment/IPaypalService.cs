using Rashtan.AuditStory.Common;
using Rashtan.AuditStory.Dto;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.PaypalPayment
{
    public interface IPaypalService
    {
        Task<CsResult<PaymentProcessed>> VerifyRequestAsync(string reqBody);
    }
}
