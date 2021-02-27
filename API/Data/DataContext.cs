using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<AppUser> Users { get; set; }

		public DbSet<FriendRelation> FriendRelations { get; set; }

		public DbSet<FriendRequest> FriendRequests { get; set; }

    public DbSet<Message> Messages { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<FriendRelation>()
				.HasOne(x => x.Friend)
				.WithMany()
				.HasForeignKey(x => x.FriendId).IsRequired().OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<FriendRelation>()
				.HasOne(x => x.User)
				.WithMany()
				.HasForeignKey(x => x.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<FriendRequest>()
				.HasOne(x => x.Requestor)
				.WithMany()
				.HasForeignKey(x => x.RequestorId).IsRequired().OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<FriendRelation>()
				.HasOne(x => x.Friend)
				.WithMany()
				.HasForeignKey(x => x.FriendId).IsRequired().OnDelete(DeleteBehavior.Cascade);

		}

		public async Task<IEnumerable<FriendRequestRecord>> GetFriendRequestsForUser(int userId)
		{
			return (await this.FriendRequests
				.Include(x => x.Friend).Include(x => x.Requestor)
				.Where(x => x.FriendId == userId || x.RequestorId == userId).ToListAsync())
				.Select(x => new FriendRequestRecord(x.Id, x.FriendId == userId ? x.Requestor : x.Friend, x.FriendId == userId));
		}

		public record FriendRequestRecord(int Id, AppUser Friend, bool CanApprove);
	}
}