using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Rashtan.AuditStory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Company>> Get()
        {
            var currentUser = HttpContext.User;

            return new [] 
            {
                new Company { Name = "Micron", Ticker = "MU" },
                new Company { Name = "Microsoft", Ticker = "MSFT" }
            };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Company> Get(int id)
        {
            return new Company { Name = "Micron", Ticker = "MU" };
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class Company
    {
        public string Name { get; set; }
        public string Ticker { get; set; }
    }
}
