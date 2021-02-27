namespace API.Extensions
{
	using System.IdentityModel.Tokens.Jwt;
	using System.Linq;
	using System.Security.Claims;

	public static class ClaimsExtension
	{
		public static int GetUserId(this ClaimsPrincipal user)
		{
			return int.Parse(user.Claims.First(x => x.Type == JwtRegisteredClaimNames.Sid).Value);
		}
	}
}
