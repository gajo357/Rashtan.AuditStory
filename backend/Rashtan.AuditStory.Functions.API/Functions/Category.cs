using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.Workflows;
using Rashtan.AuditStory.Functions.API.Utils;

namespace Rashtan.AuditStory.Functions.API
{
    public class Category
    {
        private CategoryWorkflow Workflow { get; }
        private FunctionAppAuth0Authenticator Authenticator { get; }

        public Category(CategoryWorkflow workflow, FunctionAppAuth0Authenticator authenticator)
        {
            Workflow = workflow;
            Authenticator = authenticator;
        }

        [FunctionName(nameof(Category))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, Constants.HttpGet, Constants.HttpPut, Constants.HttpPost, Route = null)] HttpRequest req,
            ILogger log)
        {
            return req.Method switch
            {
                Constants.HttpGet => await req.GetAsync(Authenticator, userId => Workflow.GetCategories(userId), log),
                Constants.HttpPut => await req.PostAsync<Dto.Category, bool>(Authenticator, (userId, category) => Workflow.SaveCategory(userId, category), log),
                Constants.HttpPost => await req.PostAsync<Dto.Category[], bool>(Authenticator, (userId, categories) => Workflow.SaveCategories(userId, categories), log),
                _ => new NotFoundResult(),
            };
        }
    }
}
