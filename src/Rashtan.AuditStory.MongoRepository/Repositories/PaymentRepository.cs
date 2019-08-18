using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository
{
    public class PaymentRepository : UserDataRepository<Payment.PaymentProcessed>, IPaymentRepository
    {
        public PaymentRepository(IMongoContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<Payment.PaymentProcessed>> GetPaymentsAsync(string userId) => await GetAllAsync(userId);

        public async Task SavePaymentAsync(string userId, Payment.PaymentProcessed payment) => await AddAsync(userId, payment);
    }
}
