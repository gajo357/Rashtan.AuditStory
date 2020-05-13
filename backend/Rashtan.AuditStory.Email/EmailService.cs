using Microsoft.Extensions.Configuration;
using Rashtan.AuditStory.Common;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Email
{
    public class EmailService : IEmailService
    {
        public EmailService(IConfiguration configuration)
        {
            var emailSection = configuration.GetSection("Email");

            FeedbackEmail = emailSection["FeedbackEmail"];
            HelpEmail = emailSection["HelpEmail"];
            Client = new SendGridClient(emailSection["ApiKey"]);
        }

        private string FeedbackEmail { get; }
        private string HelpEmail { get; }
        private SendGridClient Client { get; }

        public Task<CsResult<bool>> SendFeedbackAsync(string from, Dto.Email email)
            => SendEmailAsync(from, FeedbackEmail, email);

        public Task<CsResult<bool>> AskForHelpAsync(string from, Dto.Email email)
            => SendEmailAsync(from, HelpEmail, email);

        private async Task<CsResult<bool>> SendEmailAsync(string from, string to, Dto.Email email)
        {
            var fromAddress = new EmailAddress(from, email.Name);
            var toAddress = new EmailAddress(to);

            var msg = MailHelper.CreateSingleEmail(fromAddress, toAddress, email.Subject, string.Empty, email.Content);

            var response = await Client.SendEmailAsync(msg);
            
            return CsResult.CreateResult(response.StatusCode == System.Net.HttpStatusCode.Accepted);
        }
    }
}
