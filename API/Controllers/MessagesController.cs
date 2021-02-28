using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  //[Route("[controler]/[action]")]
  [Route("api/messages")]
  [Authorize]
    public class MessagesController : BaseApiController
    {
		private readonly DataContext _context;

		public MessagesController(DataContext context)
		{
			_context = context;
		}

    [HttpPost]
    [Route("AddMessage")]
    //[Route("[controller]/[action]")]
    public async Task<IActionResult> AddMessage (AddMessageDto messageDto)
    {
      var message = new Message();
      message.Modify = DateTime.Now;
      message.Content = message.Content;
      message.AuthorId = this.User.GetUserId();
      this._context.Messages.Add(message);
      await this._context.SaveChangesAsync();
      return Ok();
    }

    [HttpGet]
    //[Route("[controler]/[action]")]
    //[Route("GetRecentMessages")]
    public async Task<IActionResult> GetRecentMessages(int userId)
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
    }
	}
}
