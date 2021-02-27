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
	public class UsersController : BaseApiController
	{
		private readonly DataContext context;
		
		public UsersController(DataContext context)
		{
			this.context = context;
			
		}

		[HttpGet]
		[Route("find/{search}")]
		public async Task<ActionResult<IEnumerable<UserSearchResultDto>>> FindUser(string search)
		{
			var currentUserId = this.User.GetUserId();
			var searchUsers = await context.Users.Where(x => x.Id != currentUserId && x.DisplayName.ToLower().Contains(search.ToLower())).ToListAsync();
			var currentUserFriendsRequests = await this.context.GetFriendRequestsForUser(currentUserId);
			var currentUserFriends = await context.FriendRelations.Where(x => x.UserId == currentUserId).Select(x => x.FriendId).ToListAsync();

			return Ok(searchUsers.Select(x =>
				new UserSearchResultDto(x.Id, x.DisplayName, currentUserFriends.Contains(x.Id), currentUserFriendsRequests.Any(y => y.Friend.Id == x.Id))));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<AppUser>> GetUser(int id)
		{
			return await context.Users.FindAsync(id);
		}
	}
}