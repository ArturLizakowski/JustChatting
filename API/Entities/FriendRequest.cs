using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
	public class FriendRequest
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public int RequestorId { get; set; }

		public AppUser Requestor { get; set; }

		public int FriendId { get; set; }

		public AppUser Friend { get; set; }
	}
}