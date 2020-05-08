using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Rashtan.AuditStory.Common;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Web.Http;

namespace Rashtan.AuditStory.Functions.API.Utils
{
    public static class ResultHandler
    {
        public static IActionResult UnwrapResult<T>(this CsResult<T> result)
        {
            if (result.IsError)
                new BadRequestObjectResult(result.Error);

            return new OkObjectResult(result.Result);
        }

        public static async Task<IActionResult> GetAsync<TResult>(this HttpRequest req, FunctionAppAuth0Authenticator authenticator, Func<string, Task<CsResult<TResult>>> taskFunc, ILogger log)
        {
            try
            {
                var user = await authenticator.AuthenticateAsync(req, log);
                if (user.IsError)
                {
                    log.LogWarning(user.Error);
                    return new UnauthorizedResult();
                }

                return UnwrapResult(await taskFunc(user.Result));
            }
            catch (Exception e)
            {
                log.LogError("Internal server error", e);
                return new InternalServerErrorResult();
            }
        }


        public static async Task<IActionResult> PostAsync<TBody, TResult>(this HttpRequest req, FunctionAppAuth0Authenticator authenticator, Func<string, TBody, Task<CsResult<TResult>>> taskFunc, ILogger log)
        {
            try
            {
                var user = await authenticator.AuthenticateAsync(req, log);
                if (user.IsError)
                {
                    log.LogWarning(user.Error);
                    new UnauthorizedResult();
                }

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var data = JsonConvert.DeserializeObject<TBody>(requestBody);

                return UnwrapResult(await taskFunc(user.Result, data));
            }
            catch (Exception e)
            {
                log.LogError("Internal server error", e);
                return new InternalServerErrorResult();
            }
        }
    }
}
