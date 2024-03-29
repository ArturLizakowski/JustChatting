using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class AccountController : BaseApiController
	{
		private readonly DataContext context;
		private readonly ITokenService tokenService;
		public AccountController(DataContext context, ITokenService tokenService)
		{
			this.tokenService = tokenService;
			this.context = context;
		}

		[HttpPost("register")]
		public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
		{
			if (await UserExists(registerDto.Email))
			{
				return BadRequest("Username is taken");
			}

			using var hmac = new HMACSHA512();

			var user = new AppUser
			{
				UserName = registerDto.Email.ToLower(),
				DisplayName = registerDto.DisplayName,
				PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
				PasswordSalt = hmac.Key
			};

			context.Users.Add(user);
			await context.SaveChangesAsync();

			return Ok();
		}

		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		{
			var user = await context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Email);

			if (user == null) return Unauthorized("Invalid username!");

			using var hmac = new HMACSHA512(user.PasswordSalt);

			var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

			if (!computedHash.SequenceEqual(user.PasswordHash)) return Unauthorized("Invalid passowrd!");


			return new UserDto
			{
				DisplayName = user.DisplayName,
				Token = tokenService.CreateToken(user)
			};
		}

		private async Task<bool> UserExists(string username)
		{
			return await context.Users.AnyAsync(x => x.UserName == username.ToLower());
		}
	}
}