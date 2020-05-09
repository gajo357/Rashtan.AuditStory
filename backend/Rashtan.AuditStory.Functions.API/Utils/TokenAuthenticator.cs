using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Rashtan.AuditStory.Common;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.Functions.API.Utils
{
    /// <summary>
    /// A type that authenticates users against an Auth0 account.
    /// </summary>
    public sealed class TokenAuthenticator
    {
        private ConfigurationManager<OpenIdConnectConfiguration> Manager { get; }
        private JwtSecurityTokenHandler Handler { get; }

        private string Auth0Domain { get; }
        private string Auth0Audience { get; }

        private HttpClient HttpClient { get; }

        /// <summary>
        /// Creates a new authenticator. In most cases, you should only have one authenticator instance in your application.
        /// </summary>
        /// <param name="auth0Domain">The domain of the Auth0 account, e.g., <c>"myauth0test.auth0.com"</c>.</param>
        /// <param name="audiences">The valid audiences for tokens. This must include the "audience" of the access_token request, and may also include a "client id" to enable id_tokens from clients you own.</param>
        public TokenAuthenticator(IConfiguration configuration, IHttpClientFactory factory)
        {
            Auth0Domain = configuration["Auth0:Authority"];
            Auth0Audience = configuration["Auth0:Audience"];

            Manager = new ConfigurationManager<OpenIdConnectConfiguration>($"{Auth0Domain}.well-known/openid-configuration", new OpenIdConnectConfigurationRetriever());
            Handler = new JwtSecurityTokenHandler();

            HttpClient = factory.CreateClient();
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
                var config = await Manager.GetConfigurationAsync(cancellationToken).ConfigureAwait(false);
                var parameters = new TokenValidationParameters
                {
                    ValidAudience = Auth0Audience,
                    ValidIssuer = Auth0Domain,
                    IssuerSigningKeys = config.SigningKeys
                };

                var user = Handler.ValidateToken(token, parameters, out var validatedToken);
                
                return CsResult.CreateResult(user);
            }
            catch (Exception e)
            {
                return CsResult<ClaimsPrincipal>.createError(e.Message);
            }
        }
        public async Task<CsResult<UserInfo>> Auth0Userinfo(AuthenticationHeaderValue token)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"{Auth0Domain}userinfo");
            request.Headers.Authorization = token;

            var result = await HttpClient.SendAsync(request);
            if (result.IsSuccessStatusCode)
                return  CsResult.CreateResult(await result.Content.ReadAsAsync<UserInfo>());

            return  CsResult<UserInfo>.createError(await result.Content.ReadAsStringAsync());
        }
    }

    public static class TokenAuthenticatorExtensions
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
    }
}
