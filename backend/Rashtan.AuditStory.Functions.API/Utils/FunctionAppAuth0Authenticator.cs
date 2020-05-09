using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Rashtan.AuditStory.Common;

namespace Rashtan.AuditStory.Functions.API.Utils
{
    // This is a singleton, since we want to share the Auth0Authenticator instance across all function app invocations in this appdomain.
    public class FunctionAppAuth0Authenticator
    {
        /// <summary>
        /// Small optimization to skip calling Auth0 UserInfo all the time.
        /// We make it static, well aware that the life span of Functions is short
        /// </summary>
        private static IDictionary<string, UserInfo> UserDictionary { get; } = new Dictionary<string, UserInfo>();

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

                // authenticate the token, most of the time it will run sinchronously
                var claimsPrincipal= await TokenAuthenticator.AuthenticateAsync(header.Result.Parameter);
                if (claimsPrincipal.IsError)
                    return CsResult<string>.createError(claimsPrincipal.Error);

                // see if the user is already in the dictionary
                var sub = claimsPrincipal.Result.Claims.FirstOrDefault(s => s.Type.Contains("nameidentifier")).Value;
                if (UserDictionary.ContainsKey(sub))
                    return CsResult.CreateResult(UserDictionary[sub].Email);

                // otherwise call the Auth0 to get the info
                var userInfo = await TokenAuthenticator.Auth0Userinfo(header.Result);
                if (userInfo.IsError)
                    return CsResult<string>.createError(userInfo.Error);
                if (userInfo.Result.Email_verified && !string.IsNullOrEmpty(userInfo.Result.Email))
                {
                    UserDictionary.Add(sub, userInfo.Result);
                    return CsResult.CreateResult(userInfo.Result.Email);
                }

                return CsResult<string>.createError("User e-mail could not be retrieved");
            }
            catch (Exception ex)
            {
                log.LogError("Authorization failed", ex);
                throw;
            }
        }

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
