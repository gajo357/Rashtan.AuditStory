using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using static Rashtan.AuditStory.Dto.Checklist;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChecklistController : ControllerBase
    {
        // GET api/checklist/MSFT
        [HttpGet("{ticker}")]
        public ActionResult<IEnumerable<ChecklistItem>> Get()
        {
            return new[]
            {
                new ChecklistItem("Am I biased", "Not at all", Dto.Common.Understanding.Yes)
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
