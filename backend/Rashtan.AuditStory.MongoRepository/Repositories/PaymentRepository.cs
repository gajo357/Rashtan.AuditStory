using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.MongoRepository.Repositories
{
    internal class PaymentRepository : UserDataRepository<PaymentProcessed>, IPaymentRepository
    {
        public PaymentRepository(IMongoContext context) : base(context)
        {
        }

        public Task<IEnumerable<PaymentProcessed>> GetPaymentsAsync(string userId) => GetAllAsync(userId);

        public Task SavePaymentAsync(PaymentProcessed payment) => AddAsync(payment.PayerEmail, payment);

        public Task<bool> PaymentExistsAsync(PaymentProcessed payment)
            => ExistsAsync(payment.PayerEmail, CreateDataFilter(nameof(PaymentProcessed.TransactionId), payment.TransactionId));
    }
}
