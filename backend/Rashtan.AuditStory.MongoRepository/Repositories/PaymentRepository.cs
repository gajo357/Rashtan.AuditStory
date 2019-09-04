using Rashtan.AuditStory.DbModel;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository
{
    public class PaymentRepository : UserDataRepository<ProcessedPayment>, IPaymentRepository
    {
        public PaymentRepository(IMongoContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ProcessedPayment>> GetPaymentsAsync(string userId) => await GetAllAsync(userId);

        public async Task SavePaymentAsync(string userId, ProcessedPayment payment) => await AddAsync(userId, payment);
    }
}
