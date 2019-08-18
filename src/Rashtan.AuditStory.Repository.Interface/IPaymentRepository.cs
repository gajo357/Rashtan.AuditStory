using System.Collections.Generic;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Payment;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface IPaymentRepository
    {
        Task<IReadOnlyList<PaymentProcessed>> GetPaymentsAsync(string userId);
        Task SavePaymentAsync(string userId, PaymentProcessed payment);
    }
}
