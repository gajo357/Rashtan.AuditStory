using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.Workflows;
using Rashtan.AuditStory.Functions.API.Utils;
using System;

namespace Rashtan.AuditStory.Functions.API.Functions
{
    public class Company
    {
        private CompanyWorkflow Workflow { get; }
        private FunctionAppAuth0Authenticator Authenticator { get; }

        public Company(CompanyWorkflow workflow, FunctionAppAuth0Authenticator authenticator)
        {
            Workflow = workflow;
            Authenticator = authenticator;
        }

        [FunctionName(nameof(Company))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, Constants.HttpGet, Constants.HttpPost, Route = null)] HttpRequest req,
            ILogger log)
        {
            return req.Method switch
            {
                Constants.HttpGet => await req.GetAsync(Authenticator, userId => Workflow.GetQuickInfosAsync(userId), log),
                Constants.HttpPost => await req.PostAsync<Dto.CompanyStoryCreate, Guid>(Authenticator, (userId, data) => Workflow.CreateStoryAsync(userId, data), log),
                _ => new NotFoundResult(),
            };
        }
    }
}
