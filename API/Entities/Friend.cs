using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
	public class FriendRelation
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public int UserId { get; set; }

		public AppUser User { get; set; }

		public int FriendId { get; set; }

		public AppUser Friend { get; set; }
	}
}