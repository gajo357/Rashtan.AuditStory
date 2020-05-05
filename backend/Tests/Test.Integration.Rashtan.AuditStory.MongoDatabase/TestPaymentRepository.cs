using NUnit.Framework;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository.Basic;
using Rashtan.AuditStory.MongoRepository.Repositories;
using System;
using System.Threading.Tasks;

namespace Test.Integration.Rashtan.AuditStory.MongoDatabase
{
    [TestFixture]
    public class TestPaymentRepository
    {
        [Test, Explicit]
        public async Task Test_UserProfileSaved()
        {
            var config = IntegrationTestBase.InitConfiguration();
            var context = new MongoContext(config);

            var repo = new PaymentRepository(context);
            var payment = new PaymentProcessed(config["User"], 0, "USD", "Permanent", 1000, Guid.NewGuid().ToString(), DateTime.UtcNow);
            await repo.SavePaymentAsync(payment);

            Assert.Pass();
        }
    }
}
