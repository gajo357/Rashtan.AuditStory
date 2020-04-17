using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Workflows;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController : UserBasedController
    {
        private CategoryWorkflow CategoryWorkflow { get; }

        public CategoryController(CategoryWorkflow categoryWorkflow)
        {
            CategoryWorkflow = categoryWorkflow;
        }

        // GET api/checklist
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> Get()
            => Unpack(await CategoryWorkflow.GetCategories(UserId));

        [HttpPut]
        public async Task<ActionResult<bool>> Save([FromBody] Category category)
            => Unpack(await CategoryWorkflow.SaveCategory(UserId, category));

        [HttpPost]
        public async Task<ActionResult<bool>> Save([FromBody] Category[] categories)
            => Unpack(await CategoryWorkflow.SaveCategories(UserId, categories));
    }
}