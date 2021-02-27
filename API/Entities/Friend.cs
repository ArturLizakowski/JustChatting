using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
	public class FriendRelation
	{
		public FriendRelation()
		{
		}

		public FriendRelation(int userId, int friendId)
		{
			this.UserId = userId;
			this.FriendId = friendId;
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public int UserId { get; set; }

		public AppUser User { get; set; }

		public int FriendId { get; set; }

		public AppUser Friend { get; set; }
	}
}