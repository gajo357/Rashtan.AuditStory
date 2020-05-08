using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.Workflows;
using Rashtan.AuditStory.Functions.API.Utils;
using System.Collections.Generic;

namespace Rashtan.AuditStory.Functions.API.Functions
{
    class Country
    {
        private CountryWorkflow Workflow { get; }
        private FunctionAppAuth0Authenticator Authenticator { get; }

        public Country(CountryWorkflow workflow, FunctionAppAuth0Authenticator authenticator)
        {
            Workflow = workflow;
            Authenticator = authenticator;
        }

        [FunctionName(nameof(Country))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, Constants.HttpGet, Route = null)] HttpRequest req,
            ILogger log)
        {
            return req.Method switch
            {
                Constants.HttpGet => await req.GetAsync(Authenticator, _ => Workflow.GetCountriesAsync(), log),
                Constants.HttpPost => await req.PostAsync<IEnumerable<Dto.Country>, bool>(Authenticator, (userId, data) => Workflow.SaveCountriesAsync(data), log),
                _ => new NotFoundResult(),
            };
        }

        [FunctionName("Currency")]
        public Task<IActionResult> RunCurrencies(
            [HttpTrigger(AuthorizationLevel.Anonymous, Constants.HttpGet, Route = null)] HttpRequest req,
            ILogger log)
                => req.GetAsync(Authenticator, _ => Workflow.GetCurrenciesAsync(), log);
    }
}
