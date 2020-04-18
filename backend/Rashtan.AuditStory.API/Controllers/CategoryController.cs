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
        public Task<ActionResult<IEnumerable<Category>>> Get()
            => UnpackAsync(CategoryWorkflow.GetCategories(UserId));

        [HttpPut]
        public Task<ActionResult<bool>> Save([FromBody] Category category)
            => UnpackAsync(CategoryWorkflow.SaveCategory(UserId, category));

        [HttpPost]
        public Task<ActionResult<bool>> Save([FromBody] Category[] categories)
            => UnpackAsync(CategoryWorkflow.SaveCategories(UserId, categories));
    }
}