using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.Common;

namespace Rashtan.AuditStory.Functions.API.Utils
{
    // This is a singleton, since we want to share the Auth0Authenticator instance across all function app invocations in this appdomain.
    public class FunctionAppAuth0Authenticator
    {
        // I'm using a Lazy here just so that exceptions on startup are in the scope of a function execution.
        // I'm using PublicationOnly so that exceptions during creation are retried on the next execution.
        private TokenAuthenticator TokenAuthenticator { get; }

        public FunctionAppAuth0Authenticator(TokenAuthenticator tokenAuthenticator)
        {
            TokenAuthenticator = tokenAuthenticator;
        }


        /// <summary>
        /// Authenticates the user via an "Authentication: Bearer {token}" header in an HTTP request message.
        /// Returns a user ID taken from the claims.
        /// Throws an exception if any of the tokens fail to authenticate or if the Authentication header is missing or malformed.
        /// This method has an asynchronous signature, but usually completes synchronously.
        /// </summary>
        /// <param name="request">The HTTP request.</param>
        /// <param name="log">A log used to write the authentication failure to.</param>
        public async Task<CsResult<string>> AuthenticateAsync(HttpRequest request, ILogger log)
        {
            try
            {
                var claimsPrincipal = await TokenAuthenticator.AuthenticateAsync(request);
                if (claimsPrincipal.IsError)
                    return CsResult<string>.createError(claimsPrincipal.Error);

                var userId = ExtractEmailFromClaims(claimsPrincipal.Result);
                if (string.IsNullOrEmpty(userId))
                    return CsResult<string>.createError("Token does not contain e-mail information");

                return CsResult.CreateResult<string>(userId);
            }
            catch (Exception ex)
            {
                log.LogError("Authorization failed", ex);
                throw;
            }
        }

        private static string? ExtractEmailFromClaims(ClaimsPrincipal claimsPrincipal)
            => claimsPrincipal.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value;

}
}
