using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Email;
using System.Threading.Tasks;

namespace Test.Integration.Rashtan.AuditStory
{
    [TestFixture]
    public class TestEmailService
    {
        public static IConfiguration Configuration { get; } = new ConfigurationBuilder().AddJsonFile("appsettings.test.json").Build();

        [Test, Explicit]
        public async Task Test_AskForHelpAsync()
        {
            var repo = new EmailService(Configuration);
            var result = await repo.AskForHelpAsync(Configuration["Email:From"], new Email("Gajo", "Test HELP", "<p><strong>HELP</strong></p>"));

            Assert.IsTrue(result.Result);
        }

        [Test, Explicit]
        public async Task Test_SendFeedbackAsync()
        {
            var repo = new EmailService(Configuration);
            var result = await repo.SendFeedbackAsync(Configuration["Email:From"], new Email("Gajo", "Test Feedback", "<p><strong>You're awsome</strong></p>"));

            Assert.IsTrue(result.Result);
        }
    }
}
