
using backend.Services;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // SQLite 
            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source= ControleGastos.db"));

            // Registro das interfaces na injeção de dependencias.
            builder.Services.AddScoped<IPessoaService, PessoaService>();
            builder.Services.AddScoped<ICategoriaService, CategoriaService>();
            builder.Services.AddScoped<ITransacaoService, TransacaoService>();

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                if (db.Database.GetPendingMigrations().Any())
                {
                    db.Database.Migrate();
                }
                else
                {
                    db.Database.EnsureCreated();
                }
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
