using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace Rashtan.AuditStory.API.Utils
{
    internal static class ControllerExtensions
    {

        //var Name = User.Identity.Name;
        //var EmailAddress = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

        public static string UserId(this ControllerBase controller) => controller.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        public static string UserEmail(this ControllerBase controller) => controller.User.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value;
    }
}
