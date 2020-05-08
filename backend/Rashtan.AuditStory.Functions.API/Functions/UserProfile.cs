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
    public class UserProfile
    {
        private UserProfileWorkflow Workflow { get; }
        private FunctionAppAuth0Authenticator Authenticator { get; }

        public UserProfile(UserProfileWorkflow workflow, FunctionAppAuth0Authenticator authenticator)
        {
            Workflow = workflow;
            Authenticator = authenticator;
        }

        [FunctionName(nameof(UserProfile))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, Constants.HttpGet, Constants.HttpPost, Route = null)] HttpRequest req,
            ILogger log)
        {
            return req.Method switch
            {
                Constants.HttpGet => await req.GetAsync(Authenticator, userId => Workflow.GetProfileAsync(userId), log),
                Constants.HttpPost => await req.PostAsync<Dto.UserProfile, bool>(Authenticator, (userId, data) => Workflow.SaveProfileAsync(userId, data), log),
                _ => new NotFoundResult(),
            };
        }
    }
}
