
using backend.Services;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using System.Net.NetworkInformation;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            int port = 3001; // Porta padrão para o backend
            string frontPort = "3000"; // Porta do front padrão
            
            var currentDir = Directory.GetParent(Directory.GetCurrentDirectory())?.FullName
                              ?? Directory.GetCurrentDirectory();

            string envPath = Path.Combine(currentDir, ".env");

            var envVars = new Dictionary<string, string>();

            if (File.Exists(envPath))
            {
                var linhas = File.ReadAllLines(envPath);
                foreach (var linha in linhas.Where(l => l.Contains('=')))
                {
                    var partes = linha.Split('=', 2);
                    envVars[partes[0].Trim()] = partes[1].Trim();
                }
            }

            if (envVars.TryGetValue("NEXT_PUBLIC_BACKEND_PORT", out string savedBack) && int.TryParse(savedBack, out int pb))
            {
                port = pb;
            }
                

            // Verifica se a porta está ocupada, se sim, busca a próxima disponível
            port = GetAvailablePort(port);
            envVars["NEXT_PUBLIC_BACKEND_PORT"] = port.ToString();

            if (envVars.TryGetValue("NEXT_PUBLIC_FRONTEND_PORT", out string savedFront))
            {
                frontPort = savedFront;
            }
            else
            {
                envVars["NEXT_PUBLIC_FRONTEND_PORT"] = frontPort;
            }

            File.WriteAllLines(envPath, envVars.Select(kv => $"{kv.Key}={kv.Value}"));
            
            // Define a porta~do backend padrão para a aplicação
            builder.WebHost.UseUrls($"http://localhost:{port}");
            
            // SQLite 
            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source= ControleGastos.db"));

            // Registro das interfaces na injeção de dependencias.
            builder.Services.AddScoped<IPessoaService, PessoaService>();
            builder.Services.AddScoped<ICategoriaService, CategoriaService>();
            builder.Services.AddScoped<ITransacaoService, TransacaoService>();
            builder.Services.AddScoped<ITotaisService, TotaisService>();

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            // Registra o middleware de CORS para aceitar as requisições do front
            builder.Services.AddCors(options => {
                options.AddPolicy("Frontend", policy =>
                    policy.WithOrigins($"http://localhost:{frontPort}")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });


            var app = builder.Build();
            app.UseCors("Frontend");

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

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }

        // Método para encontrar porta disponível
        private static int GetAvailablePort(int startingPort)
        {
            int port = startingPort;
            bool isAvailable = false;

            while (!isAvailable)
            {
                var properties = IPGlobalProperties.GetIPGlobalProperties();
                var listeners = properties.GetActiveTcpListeners();
                isAvailable = !listeners.Any(x => x.Port == port);

                if (!isAvailable) port++;
            }
            return port;
        }
    }


}
