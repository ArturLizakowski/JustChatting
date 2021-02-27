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
	public class FriendRequestsController : BaseApiController
	{
		private readonly DataContext context;
		
		public FriendRequestsController(DataContext context)
		{
			this.context = context;			
		}

		[HttpGet]		
		public async Task<IEnumerable<UserFriendRequestDto>> GetFriendRequests()
		{
			var currentUserId = this.User.GetUserId();
			return (await this.context.GetFriendRequestsForUser(currentUserId))
				.Select(x => new UserFriendRequestDto(x.Id, x.Friend.Id, x.Friend.DisplayName, x.CanApprove));
		}

		[HttpPut]
		[Route("{id}/approve")]
		[Authorize]
		public async Task<ActionResult<IEnumerable<UserFriendDto>>> ApproveFriend(int id)
		{
			var currentUserId = this.User.GetUserId();
			var req = await this.context.FriendRequests.FirstOrDefaultAsync(x => x.Id == id);
			if (req == null)
				return NotFound();

			if (req.FriendId != currentUserId && req.RequestorId != currentUserId)
				return Forbid("You cannot approved other users friend requests");


			this.context.FriendRelations.AddRange(new FriendRelation(req.RequestorId, req.FriendId), new FriendRelation(req.FriendId, req.RequestorId));
			this.context.FriendRequests.Remove(req);
			await this.context.SaveChangesAsync();
			return Ok();
		}

		[HttpPut]
		[Route("friendsRequests/{id}/reject")]
		public async Task<ActionResult<IEnumerable<UserFriendDto>>> RejectFriend(int id)
		{
			var currentUserId = this.User.GetUserId();
			var req = await this.context.FriendRequests.FirstOrDefaultAsync(x => x.Id == id);
			if (req == null)
				return NotFound();

			if (req.FriendId != currentUserId && req.RequestorId != currentUserId)
				return Forbid("You cannot approved other users friend requests");


			this.context.FriendRequests.Remove(req);
			await this.context.SaveChangesAsync();
			return Ok();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<AppUser>> GetUser(int id)
		{
			return await context.Users.FindAsync(id);
		}
	}
}