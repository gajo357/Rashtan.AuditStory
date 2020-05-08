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
    public class Story
    {
        private CompanyWorkflow Workflow { get; }
        private FunctionAppAuth0Authenticator Authenticator { get; }

        public Story(CompanyWorkflow workflow, FunctionAppAuth0Authenticator authenticator)
        {
            Workflow = workflow;
            Authenticator = authenticator;
        }

        [FunctionName(nameof(Story))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, Constants.HttpGet, Constants.HttpPost, Constants.HttpDelete, Route = null)] HttpRequest req,
            ILogger log)
        {
            return req.Method switch
            {
                Constants.HttpGet => await req.GetAsync(Authenticator, userId => Workflow.GetStoryAsync(userId, req.Query["id"]), log),
                Constants.HttpPost => await req.PostAsync<Dto.Story, bool>(Authenticator, (userId, data) => Workflow.SaveStoryAsync(userId, data), log),
                Constants.HttpDelete => await req.PostAsync<string, bool>(Authenticator, (userId, data) => Workflow.DeleteStoryAsync(userId, req.Query["id"]), log),
                _ => new NotFoundResult(),
            };
        }
    }
}
