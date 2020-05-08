using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.Workflows;
using Rashtan.AuditStory.Functions.API.Utils;

namespace Rashtan.AuditStory.Functions.API.Functions
{
    public class UserStatus
    {
        private IUserStatusWorkflow Workflow { get; }
        private FunctionAppAuth0Authenticator Authenticator { get; }

        public UserStatus(IUserStatusWorkflow workflow, FunctionAppAuth0Authenticator authenticator)
        {
            Workflow = workflow;
            Authenticator = authenticator;
        }

        [FunctionName(nameof(UserStatus))]
        public Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, Constants.HttpGet, Route = null)] HttpRequest req,
            ILogger log)
                => req.GetAsync(Authenticator, userId => Workflow.GetUserStatusAsync(userId), log);
    }
}
