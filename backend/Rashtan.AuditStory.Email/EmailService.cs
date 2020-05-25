using Microsoft.Extensions.Configuration;
using Rashtan.AuditStory.Common;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Email
{
    internal class EmailService : IEmailService
    {
        public EmailService(IConfiguration configuration)
        {
            var emailSection = configuration.GetSection("Email");

            FeedbackEmail = emailSection["FeedbackEmail"];
            HelpEmail = emailSection["HelpEmail"];
            SenderEmail = emailSection["SenderEmail"];
            Client = new SendGridClient(emailSection["ApiKey"]);
        }

        private string SenderEmail { get; }
        private string FeedbackEmail { get; }
        private string HelpEmail { get; }
        private SendGridClient Client { get; }

        public Task<CsResult<bool>> SendFeedbackAsync(string from, Dto.Email email)
            => SendEmailAsync(from, FeedbackEmail, email);

        public Task<CsResult<bool>> AskForHelpAsync(string from, Dto.Email email)
            => SendEmailAsync(from, HelpEmail, email);

        private async Task<CsResult<bool>> SendEmailAsync(string from, string to, Dto.Email email)
        {
            var fromAddress = new EmailAddress(SenderEmail);
            var toAddress = new EmailAddress(to);

            var msg = MailHelper.CreateSingleEmail(fromAddress, toAddress, email.Subject, string.Empty, email.Content);
            msg.SetReplyTo(new EmailAddress(from, email.Name));

            var response = await Client.SendEmailAsync(msg);
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
                return CsResult.CreateResult(true);

            var content = await response.Body.ReadAsStringAsync();
            return CsResult<bool>.createError(content);
        }
    }
}
