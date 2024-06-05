using Microsoft.AspNetCore.Mvc;

namespace Team_App.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TestDataController : Controller
    {
        [HttpGet] 
        public IActionResult Get() 
        {
           Console.WriteLine("Called!");
           return Ok("Hello World");
        }
    }
    
}
