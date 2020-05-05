using Rashtan.AuditStory.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<PaymentProcessed>> GetPaymentsAsync(string userId);
        Task SavePaymentAsync(PaymentProcessed payment);
        Task<bool> PaymentExistsAsync(PaymentProcessed payment);
    }
}
