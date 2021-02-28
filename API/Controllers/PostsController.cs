using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
  [Route("api/posts")]
  [ApiController]
  [Authorize]
	public class PostsController : BaseApiController
	{
      private readonly DataContext _context;

      public PostsController(DataContext context)
      {
        _context = context;
      }

    [HttpGet]
    public async Task<IActionResult> GetRecent() => Ok(await this._context.Messages.ToListAsync());

    /*[HttpGet]
    public async Task<ActionResult> GetMessages()
    {
      try 
      {
        return Ok(await _context.GetMessages());
      }
      catch (Exception)
      {
        return StatusCodeResult(StatusCodes.Status500InternalServerError, "Error from db");
      }
    }
    [HttpPost]
    public async Task<ActionResult<Message>> AddMessage(Message message)
    {
      return Ok();
    }
   /* [HttpGet("id:int")]
    public async Task<ActionResult<Message>> getRecentMessage(int id)
    {
      try
      {
        var result = await _context.getRecentMessage(id);
      }
    }*/
    /*	private readonly DataContext _context;

      public PostsController(DataContext context)
      {
        _context = context;
      }

      [HttpPost("message")]
      public async Task<IActionResult> AddMessageDto ([FromBody] AddMessageDto messageDto)
      {
        var message = new Message();
        message.Modify = DateTime.Now;
        message.Content = messageDto.Content;
        message.AuthorId = this.User.GetUserId();
        this._context.Messages.Add(message);
        await this._context.SaveChangesAsync();
        return Ok();
      }

      [HttpGet]
      public async Task<IActionResult> GetRecent(int userId)
      {
        var currentUserId = this.User.GetUserId();
        var messages = await this._context.Messages
          .Where(x => (x.AuthorId==currentUserId && x.RecipientId==userId) || (x.AuthorId == userId && x.RecipientId == currentUserId))
            .ToListAsync();
        var messageDtos = messages
        .Select (message => {
          return new MessageDto(message.Content, message.Modify);
        }).OrderByDescending(x => x.ModifyDate);

        return Ok(messageDtos);
      }*/
  }
}