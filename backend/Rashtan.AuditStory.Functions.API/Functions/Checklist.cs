using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.Workflows;
using Rashtan.AuditStory.Functions.API.Utils;
using System.Collections.Generic;

namespace Rashtan.AuditStory.Functions.API
{
    public class Checklist
    {
        private ChecklistWorkflow Workflow { get; }
        private FunctionAppAuth0Authenticator Authenticator { get; }

        public Checklist(ChecklistWorkflow workflow, FunctionAppAuth0Authenticator authenticator)
        {
            Workflow = workflow;
            Authenticator = authenticator;
        }

        [FunctionName(nameof(Checklist))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, Constants.HttpGet, Route = null)] HttpRequest req,
            ILogger log)
        {
            return req.Method switch
            {
                Constants.HttpGet => await req.GetAsync(Authenticator, _ => Workflow.GetChecklistItemsAsync(), log),
                Constants.HttpPost => await req.PostAsync<IEnumerable<Dto.ChecklistItem>, bool>(Authenticator, (userId, data) => Workflow.SaveItemsAsync(data), log),
                _ => new NotFoundResult(),
            };
        }
    }
}
