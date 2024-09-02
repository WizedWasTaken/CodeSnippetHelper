﻿using CHS.Entities;
using Microsoft.EntityFrameworkCore;

namespace CHS.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Snippet> Snippets { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
    }
}