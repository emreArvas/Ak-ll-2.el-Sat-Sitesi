using Microsoft.AspNetCore.Mvc;

namespace Loginoperations.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PingController : ControllerBase
    {
        [HttpGet]
        public IActionResult Ping()
        {
            return Ok("Merhaba! Uygulama aktif.");
        }
    }
} 