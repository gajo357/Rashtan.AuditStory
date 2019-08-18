using NUnit.Framework;
using Rashtan.AuditStory.MongoRepository;
using System;
using System.Linq;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Payment;

namespace Test.Integration.Rashtan.AuditStory.MongoDatabase
{
    [TestFixture]
    public class TestPaymentRepository : IntegrationTestBase
    {
        [Test]
        public async Task Test_PaymentSaved()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new PaymentRepository(Context);
            var payment = new PaymentProcessed
            {
                Amount = 100,
                PayedUntil = DateTime.UtcNow,
                TransactionId = Guid.NewGuid().ToString()
            };
            await repo.SavePaymentAsync(userId, payment);

            var payments = (await repo.GetPaymentsAsync(userId)).ToArray();

            Assert.AreEqual(1, payments.Length);
            Assert.AreEqual(payment.Amount, payments[0].Amount);
            Assert.AreEqual(payment.TransactionId, payments[0].TransactionId);
            Assert.That(payment.PayedUntil, Is.EqualTo(payments[0].PayedUntil).Within(1).Seconds);
        }

        [Test]
        public async Task Test_GetPayments_NoPaymentsForDifferentUser()
        {
            var userId = Guid.NewGuid().ToString();
            var userId2 = Guid.NewGuid().ToString();

            var repo = new PaymentRepository(Context);
            var payment = new PaymentProcessed
            {
                Amount = 100,
                PayedUntil = DateTime.Now.AddDays(31),
                TransactionId = Guid.NewGuid().ToString()
            };
            await repo.SavePaymentAsync(userId, payment);

            var profiles = await repo.GetPaymentsAsync(userId2);

            Assert.IsEmpty(profiles);
        }
    }
}
