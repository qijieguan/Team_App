using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Team_App.Server.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
        }

        public DbSet<Member> Team { get; set; }
        public DbSet<Task> Tasks { get; set; }
    }
}
