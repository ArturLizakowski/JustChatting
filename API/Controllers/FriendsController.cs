using System.Collections.Generic;
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
	[Authorize]
	public class FriendsController : BaseApiController
	{
		private readonly DataContext context;

		public FriendsController(DataContext context)
		{
			this.context = context;
		}

		[HttpPost]
		public async Task<ActionResult> AddFriend(UserIdDto dto)
		{
			var currentUserId = this.User.GetUserId();
			if (currentUserId == dto.UserId)
				return BadRequest("User cannot be a friend of himself");

			if (await context.FriendRequests.AnyAsync(x => (x.FriendId == currentUserId && x.RequestorId == dto.UserId) || (x.FriendId == dto.UserId && x.RequestorId == currentUserId)))
				return Ok();

			if (await context.FriendRelations.AnyAsync(x => (x.FriendId == dto.UserId && x.UserId == currentUserId)))
				return BadRequest("User is already a friend");

			if (!await context.Users.AnyAsync(x => x.Id == dto.UserId))
				return NotFound();

			context.FriendRequests.Add(new FriendRequest(currentUserId, dto.UserId));

			await context.SaveChangesAsync();
			return Ok();
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<UserFriendDto>>> GetFriends()
		{
			var currentUserId = this.User.GetUserId();
			return Ok(await this.context.FriendRelations.Include(x => x.Friend).Where(x => x.UserId == currentUserId).Select(x => new UserFriendDto(x.FriendId, x.Friend.DisplayName)).ToListAsync());
		}
	}
}