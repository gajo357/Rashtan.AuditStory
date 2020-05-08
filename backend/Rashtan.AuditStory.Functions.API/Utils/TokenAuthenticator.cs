using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Rashtan.AuditStory.Common;

namespace Rashtan.AuditStory.Functions.API.Utils
{
    /// <summary>
    /// A type that authenticates users against an Auth0 account.
    /// </summary>
    public sealed class TokenAuthenticator
    {
        private readonly TokenValidationParameters _parameters;
        private readonly ConfigurationManager<OpenIdConnectConfiguration> _manager;
        private readonly JwtSecurityTokenHandler _handler;

        /// <summary>
        /// Creates a new authenticator. In most cases, you should only have one authenticator instance in your application.
        /// </summary>
        /// <param name="auth0Domain">The domain of the Auth0 account, e.g., <c>"myauth0test.auth0.com"</c>.</param>
        /// <param name="audiences">The valid audiences for tokens. This must include the "audience" of the access_token request, and may also include a "client id" to enable id_tokens from clients you own.</param>
        public TokenAuthenticator(IConfiguration configuration)
        {
            var auth0Domain = configuration["Auth0:Authority"];
            _parameters = new TokenValidationParameters
            {
                ValidIssuer = auth0Domain,
                ValidAudiences = new[] { configuration["Auth0:Audience"] },
                ValidateIssuerSigningKey = true,
            };
            _manager = new ConfigurationManager<OpenIdConnectConfiguration>($"{auth0Domain}/.well-known/openid-configuration", new OpenIdConnectConfigurationRetriever());
            _handler = new JwtSecurityTokenHandler();
        }

        /// <summary>
        /// Authenticates the user token. Returns a user principal containing claims from the token and a token that can be used to perform actions on behalf of the user.
        /// Throws an exception if the token fails to authenticate.
        /// This method has an asynchronous signature, but usually completes synchronously.
        /// </summary>
        /// <param name="token">The token, in JWT format.</param>
        /// <param name="cancellationToken">An optional cancellation token.</param>
        public async Task<CsResult<ClaimsPrincipal>> AuthenticateAsync(string token, CancellationToken cancellationToken = new CancellationToken())
        {
            try
            {
                // Note: ConfigurationManager<T> has an automatic refresh interval of 1 day.
                //   The config is cached in-between refreshes, so this "asynchronous" call actually completes synchronously unless it needs to refresh.
                var config = await _manager.GetConfigurationAsync(cancellationToken).ConfigureAwait(false);
                _parameters.IssuerSigningKeys = config.SigningKeys;
                var user = _handler.ValidateToken(token, _parameters, out var validatedToken);
                
                return CsResult.CreateResult(user);
            }
            catch (Exception e)
            {
                return CsResult<ClaimsPrincipal>.createError(e.Message);
            }
        }
    }

    public static class Auth0AuthenticatorExtensions
    {
        /// <summary>
        /// Authenticates the user via an "Authentication: Bearer {token}" header.
        /// Returns a user principal containing claims from the token and a token that can be used to perform actions on behalf of the user.
        /// Throws an exception if the token fails to authenticate or if the Authentication header is malformed.
        /// This method has an asynchronous signature, but usually completes synchronously.
        /// </summary>
        /// <param name="this">The authenticator instance.</param>
        /// <param name="header">The authentication header.</param>
        /// <param name="cancellationToken">An optional cancellation token.</param>
        public static async Task<CsResult<ClaimsPrincipal>> AuthenticateAsync(this TokenAuthenticator @this, AuthenticationHeaderValue header,
            CancellationToken cancellationToken = new CancellationToken())
        {
            if (header == null || !string.Equals(header.Scheme, "Bearer", StringComparison.InvariantCultureIgnoreCase))
                return CsResult<ClaimsPrincipal>.createError("Authentication header does not use Bearer token.");

            return await @this.AuthenticateAsync(header.Parameter, cancellationToken);
        }

        /// <summary>
        /// Authenticates the user via an "Authentication: Bearer {token}" header in an HTTP request message.
        /// Returns a user principal containing claims from the token and a token that can be used to perform actions on behalf of the user.
        /// Throws an exception if the token fails to authenticate or if the Authentication header is missing or malformed.
        /// This method has an asynchronous signature, but usually completes synchronously.
        /// </summary>
        /// <param name="this">The authenticator instance.</param>
        /// <param name="request">The HTTP request.</param>
        /// <param name="cancellationToken">An optional cancellation token.</param>
        public static Task<CsResult<ClaimsPrincipal>> AuthenticateAsync(this TokenAuthenticator @this, HttpRequestMessage request,
            CancellationToken cancellationToken = new CancellationToken()) =>
            @this.AuthenticateAsync(request.Headers.Authorization, cancellationToken);

        /// <summary>
        /// Authenticates the user via an "Authentication: Bearer {token}" header in an HTTP request message.
        /// Returns a user principal containing claims from the token and a token that can be used to perform actions on behalf of the user.
        /// Throws an exception if the token fails to authenticate or if the Authentication header is missing or malformed.
        /// This method has an asynchronous signature, but usually completes synchronously.
        /// </summary>
        /// <param name="this">The authenticator instance.</param>
        /// <param name="request">The HTTP request.</param>
        /// <param name="cancellationToken">An optional cancellation token.</param>
        public static async Task<CsResult<ClaimsPrincipal>> AuthenticateAsync(this TokenAuthenticator @this, HttpRequest request,
            CancellationToken cancellationToken = new CancellationToken()) 
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
                return CsResult<ClaimsPrincipal>.createError("No Authorization header");
            }

            // We got a value from the Authorization header.

            if (!AuthenticationHeaderValue.TryParse(
                    rawAuthorizationHeaderValue, // StringValues automatically convert to string.
                    out AuthenticationHeaderValue authenticationHeaderValue))
            {
                // Invalid token format.
                return CsResult<ClaimsPrincipal>.createError("Cannot parse Authorization header");
            }

            return await @this.AuthenticateAsync(authenticationHeaderValue, cancellationToken);
        }
    }

}
