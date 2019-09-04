using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.API.Utils;
using Rashtan.AuditStory.Repository.Interface;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class FolderController : UserBasedController
    {
        private ICompanyProfileRepository CompanyProfileRepository { get; }

        public FolderController(ICompanyProfileRepository companyProfileRepository)
        {
            CompanyProfileRepository = companyProfileRepository;
        }

        // GET api/folder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Get() 
            => (await CompanyProfileRepository.GetProfilesAsync(UserId))
            .Select(s => s.Folder)
            .Distinct()
            .ToArray();
    }
}
