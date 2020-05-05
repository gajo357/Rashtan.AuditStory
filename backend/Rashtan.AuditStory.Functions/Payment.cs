using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.PaypalPayment;
using Rashtan.AuditStory.Repository.Interface;
using Rashtan.AuditStory.Workflows;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Functions
{
    public class Payment
    {
        public PaymentWorkflow PaymentWorkflow { get; }
        public IPaypalService PaypalService { get; }
        public IPaymentRepository Repository { get; }

        public Payment(PaymentWorkflow paymentWorkflow, IPaypalService paypalService, IPaymentRepository repository)
        {
            PaymentWorkflow = paymentWorkflow;
            PaypalService = paypalService;
            Repository = repository;
        }

        [FunctionName("Payment")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequestMessage req,
            [DurableClient]IDurableClient orchestrationClient,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger payment function processed a request.");
            
            var requestBody = new RequestBodyDto { Content = await req.Content.ReadAsStringAsync() };
            log.LogInformation(requestBody.Content);

            // we just start the process and do not care to wait for it to finish
            _ = await orchestrationClient.StartNewAsync(nameof(DurableProcess), requestBody);
            
            // have to return empty OK to PayPal immediately
            return new OkResult();
        }

        [FunctionName(nameof(DurableProcess))]
        public async Task DurableProcess(
            [OrchestrationTrigger] IDurableOrchestrationContext context,
            ILogger log)
        {
            log.LogInformation("Started payment durable workflow");

            var reqBody = context.GetInput<RequestBodyDto>();
            var result = await context.CallActivityAsync<PaymentProcessed>(nameof(VerifyRequest), reqBody.Content);
            if (result != null)
                await context.CallActivityAsync(nameof(SavePayment), result);

            log.LogInformation("Exited payment durable workflow");
        }

        [FunctionName(nameof(VerifyRequest))]
        public async Task<PaymentProcessed> VerifyRequest([ActivityTrigger] string reqBody, ILogger log)
        {
            log.LogInformation("Started VerifyRequest");
            var result = await PaypalService.VerifyRequestAsync(reqBody);
            log.LogInformation(result.IsSuccess.ToString());
            log.LogInformation(result.Error);
            log.LogInformation("Exited VerifyRequest");

            return result.Result;
        }

        [FunctionName(nameof(SavePayment))]
        public async Task SavePayment([ActivityTrigger] PaymentProcessed processed, ILogger log)
        {
            try
            {
                log.LogInformation("Started SavePayment");
                var p = await Repository.PaymentExistsAsync(processed);
                if (p)
                    log.LogInformation("Payment already exists");
                else
                    await Repository.SavePaymentAsync(processed);
                log.LogInformation("Exited SavePayment");
            }
            catch (Exception e)
            {
                log.LogInformation(e.Message);
            }
        }

        /// <summary>
        /// Helper class because string cannot be sent to Durable Function
        /// </summary>
        public class RequestBodyDto
        {
            public string Content { get; set; }
        }
    }
}
