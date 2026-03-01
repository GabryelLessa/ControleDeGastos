using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Pessoa> Pessoas => Set<Pessoa>();
        public DbSet<Categoria> Categorias => Set<Categoria>();
        public DbSet<Transacao> Transacoes => Set<Transacao>();
    }
}
