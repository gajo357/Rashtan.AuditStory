using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Workflows;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChecklistController : UserBasedController
    {
        public ChecklistController(ChecklistWorkflow checklistWorkflow)
        {
            ChecklistWorkflow = checklistWorkflow;
        }
        private ChecklistWorkflow ChecklistWorkflow { get; }

        // GET api/checklist
        [HttpGet]
        public Task<ActionResult<IEnumerable<ChecklistItem>>> Get()
            => UnpackAsync(ChecklistWorkflow.GetChecklistItemsAsync());

        [HttpPost]
        public Task<ActionResult<bool>> Post(IEnumerable<ChecklistItem> items)
            => UnpackAsync(ChecklistWorkflow.SaveItemsAsync(items));
    }
}
