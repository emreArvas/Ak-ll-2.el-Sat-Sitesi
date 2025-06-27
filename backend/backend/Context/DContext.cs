using Loginoperations.Model;
using Loginoperations.Model.Order;
using Microsoft.EntityFrameworkCore;



namespace Loginoperations.Context
{
    public class DContext : DbContext
    {
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Product?> Products { get; set; }
        public DbSet<User?> Users { get; set; }
        public DbSet<Order?> Orders { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18, 2)"); 
        }

        public DContext(DbContextOptions<DContext> options)
            : base(options)
        {
        }
    }
}

