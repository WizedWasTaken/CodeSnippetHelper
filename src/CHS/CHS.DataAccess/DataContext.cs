using CHS.Entities;
using Microsoft.EntityFrameworkCore;

namespace CHS.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.User)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict); // or DeleteBehavior.SetNull

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.Snippet)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Like>()
                .HasOne(l => l.User)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Like>()
                .HasOne(l => l.Snippet)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Snippet> Snippets { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Like> Likes { get; set; }
    }
}