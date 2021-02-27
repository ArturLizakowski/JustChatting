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
	}
}