using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase
  {
    private readonly DataContext _context;
    public AuthController(DataContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
      return await _context.Users.ToListAsync();
    }
    
    
    [HttpPost]
    public async Task<ActionResult<AppUser>> Register(int id)
    {
      return await _context.Users.FindAsync(id);
    }
  }
}