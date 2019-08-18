using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class FolderController : ControllerBase
    {
        private IFolderRepository FolderRepository { get; }

        public FolderController(IFolderRepository folderRepository)
        {
            FolderRepository = folderRepository;
        }

        // GET api/folder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Folder.Folder>>> Get() => (await FolderRepository.GetFoldersAsync(this.UserId())).ToArray();
    }
}
