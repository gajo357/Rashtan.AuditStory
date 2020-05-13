using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.Functions.API.Utils;
using Rashtan.AuditStory.Email;

namespace Rashtan.AuditStory.Functions.API.Functions
{
    public class Email
    {
        private IEmailService EmailService { get; }
        private FunctionAppAuth0Authenticator Authenticator { get; }
        public Email(IEmailService emailService, FunctionAppAuth0Authenticator authenticator)
        {
            EmailService = emailService;
            Authenticator = authenticator;
        }

        [FunctionName(nameof(SendFeedback))]
        public Task<IActionResult> SendFeedback(
            [HttpTrigger(AuthorizationLevel.Function, Constants.HttpPost, Route = null)] HttpRequest req,
            ILogger log) => req.PostAsync<Dto.Email, bool>(Authenticator, (userId, data) => EmailService.SendFeedbackAsync(userId, data), log);

        [FunctionName(nameof(AskForHelp))]
        public Task<IActionResult> AskForHelp(
            [HttpTrigger(AuthorizationLevel.Function, Constants.HttpPost, Route = null)] HttpRequest req,
            ILogger log) => req.PostAsync<Dto.Email, bool>(Authenticator, (userId, data) => EmailService.AskForHelpAsync(userId, data), log);
    }
}
