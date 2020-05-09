using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
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
                var header = ExtractHeader(request);
                if (header.IsError)
                    return CsResult<string>.createError(header.Error);

                var userInfoTask = TokenAuthenticator.Auth0Userinfo(header.Result);
                var claimsPrincipalTask = TokenAuthenticator.AuthenticateAsync(header.Result.Parameter);

                await Task.WhenAll(userInfoTask, claimsPrincipalTask);

                var claimsPrincipal = claimsPrincipalTask.Result;
                if (claimsPrincipal.IsError)
                    return CsResult<string>.createError(claimsPrincipal.Error);

                var userInfo = userInfoTask.Result;
                if (userInfo.IsError)
                    return CsResult<string>.createError(userInfo.Error);
                if (userInfo.Result.Email_verified && !string.IsNullOrEmpty(userInfo.Result.Email))
                    return CsResult.CreateResult<string>(userInfo.Result.Email);

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

        /// <summary>
        /// Extracts the AuthenticationHeaderValue from the request.
        /// </summary>
        /// <param name="request">The HTTP request.</param>
        public static CsResult<AuthenticationHeaderValue> ExtractHeader(HttpRequest request)
        {
            // Get a StringValues object that represents the content of the Authorization header found in the given
            // headers.
            // Note that the default for a IHeaderDictionary is a StringValues object with one null string.
            var rawAuthorizationHeaderValue = request.Headers
                .SingleOrDefault(x => x.Key == "Authorization") // Case sensitive.
                .Value;

            if (rawAuthorizationHeaderValue.Count != 1)
            {
                // StringValues' Count will be zero if there is no Authorization header
                // and greater than one if there are more than one Authorization headers.
                return CsResult<AuthenticationHeaderValue>.createError("No Authorization header");
            }

            // We got a value from the Authorization header.

            if (!AuthenticationHeaderValue.TryParse(
                    rawAuthorizationHeaderValue, // StringValues automatically convert to string.
                    out AuthenticationHeaderValue authenticationHeaderValue))
            {
                // Invalid token format.
                return CsResult<AuthenticationHeaderValue>.createError("Cannot parse Authorization header");
            }

            return CsResult.CreateResult(authenticationHeaderValue);
        }
    }
}
