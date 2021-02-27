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
	public class UsersController : BaseApiController
	{
		private readonly DataContext context;
		public UsersController(DataContext context)
		{
			this.context = context;
		}

		[HttpGet]
		[AllowAnonymous]
		public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
		{
			return await context.Users.ToListAsync();
		}

		[HttpGet]
		[Route("find/{search}")]
		[Authorize]
		public async Task<ActionResult<IEnumerable<UserSearchResultDto>>> FindUser(string search)
		{
			var id = this.User.GetUserId();
			var searchUsers = await context.Users.Where(x => x.Id != id && x.DisplayName.ToLower().Contains(search.ToLower())).ToListAsync();
			var currentUserFriendsRequests = (await context.FriendRequests.Where(x => x.FriendId == id || x.RequestorId == id).ToListAsync()).Select(x => x.FriendId == id ? x.RequestorId : x.FriendId);
			var currentUserFriends = await context.FriendRelations.Where(x => x.UserId == id).Select(x => x.Id).ToListAsync();

			return Ok(searchUsers.Select(x =>
				new UserSearchResultDto(x.Id, x.DisplayName, currentUserFriends.Contains(x.Id), currentUserFriendsRequests.Contains(x.Id))));

		}

		[Authorize]
		[HttpGet("{id}")]
		public async Task<ActionResult<AppUser>> GetUser(int id)
		{
			return await context.Users.FindAsync(id);
		}
	}
}