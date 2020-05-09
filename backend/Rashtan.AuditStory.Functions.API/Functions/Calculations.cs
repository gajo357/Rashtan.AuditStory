using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Rashtan.AuditStory.Functions.API.Utils;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Functions.API.Functions
{
    public static class Calculations
    {
        [FunctionName(nameof(Cagr))]
        public static async Task<IActionResult> Cagr(
            [HttpTrigger(AuthorizationLevel.Anonymous, Constants.HttpPost, Route = "calculations/cagr")] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<CagrDto>(requestBody);

            if (data == null || !data.Start.HasValue || !data.End.HasValue || !data.Intervals.HasValue)
                return new BadRequestObjectResult("Please pass all info");

            if (data.Start == 0)
                return new BadRequestObjectResult("Start cannot be 0");
            if (data.Intervals == 0)
                return new BadRequestObjectResult("Number of Intervals cannot be 0");

            var result = Math.Pow(data.End.Value / data.Start.Value, 1.0 / data.Intervals.Value) - 1.0;

            return new OkObjectResult(result * 100.0);
        }
    }

    public class CagrDto
    {
        public double? Start { get; set; }
        public double? End { get; set; }
        public int? Intervals { get; set; }
    }
}
