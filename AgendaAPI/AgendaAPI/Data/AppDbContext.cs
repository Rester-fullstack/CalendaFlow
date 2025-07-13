using AgendaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AgendaAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Event> Events => Set<Event>();
        public DbSet<EventParticipant> EventParticipants => Set<EventParticipant>();
    }
}
