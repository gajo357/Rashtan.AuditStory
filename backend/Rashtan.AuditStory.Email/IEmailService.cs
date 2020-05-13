using Rashtan.AuditStory.Common;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Email
{
    public interface IEmailService
    {
        Task<CsResult<bool>> SendFeedbackAsync(string from, Dto.Email email);
        Task<CsResult<bool>> AskForHelpAsync(string from, Dto.Email email);
    }
}
