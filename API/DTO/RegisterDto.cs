using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
	public class RegisterDto
	{
		[Required]
		[EmailAddress]
		[MaxLength(255)]
		public string Email { get; set; }

		[Required]
		[MaxLength(255)]
		public string DisplayName { get; set; }

		[Required]
		public string Password { get; set; }

	}
}