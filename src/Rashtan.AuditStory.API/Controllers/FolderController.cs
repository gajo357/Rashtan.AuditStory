using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rashtan.AuditStory.Dto;
using System.Collections.Generic;
using static Rashtan.AuditStory.Dto.Company;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class FolderController : ControllerBase
    {
        // GET api/folder
        [HttpGet]
        public ActionResult<Folder.Folder[]> Get()
        {
            return new[] {
                new Folder.Folder("Wonderfull"),
                new Folder.Folder("Too Hard"),
                new Folder.Folder("Not good enough")
            };
        }

        // GET api/folder/companies?name=Too Hard
        [HttpGet]
        public ActionResult<IEnumerable<CompanyProfile>> Companies([FromQuery]string name) => 
            new[]
            {
                new CompanyProfile { Name = "Micron", Ticker = "MU", MarketCap = 50 * 1e9 },
                new CompanyProfile { Name = "Microsoft", Ticker = "MSFT", MarketCap = 500 * 1e9 }
            };
    }
}
