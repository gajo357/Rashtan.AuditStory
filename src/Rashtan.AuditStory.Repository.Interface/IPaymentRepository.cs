using System.Collections.Generic;
using System.Threading.Tasks;
using Rashtan.AuditStory.DbModel;

namespace Rashtan.AuditStory.Repository.Interface
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<ProcessedPayment>> GetPaymentsAsync(string userId);
        Task SavePaymentAsync(string userId, ProcessedPayment payment);
    }
}
