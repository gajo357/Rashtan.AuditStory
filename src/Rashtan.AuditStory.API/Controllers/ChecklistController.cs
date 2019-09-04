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
        // GET api/checklist/MSFT
        [HttpGet("{ticker}")]
        public ActionResult<IEnumerable<ChecklistItem>> Get()
        {
            return new[]
            {
                new ChecklistItem("Am I biased", "Not at all", Dto.Understanding.Yes)
            };
        }

        // POST api/checklist
        [HttpPost]
        public ActionResult<bool> Post([FromBody] ChecklistItem company)
        {
            // save to database
            return true;
        }
    }
}
