using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using System.Collections.Generic;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChecklistController : UserBasedController
    {
        // GET api/checklist
        [HttpGet]
        public ActionResult<IEnumerable<ChecklistItem>> Get()
        {
            return new[]
            {
                new ChecklistItem("Am I biased", 3.5)
            };
        }
    }
}
