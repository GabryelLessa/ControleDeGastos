using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TotaisService : ITotaisService
    {
        private readonly AppDbContext _dbCtx;
        public TotaisService(AppDbContext db)
        {
            _dbCtx = db;
        }

        //Realizar os calculos de totais por pessoas
        public async Task<TotaisByPessoaDto> GetTotalsByPessoaAsync()
        {
            var pessoas = await _dbCtx.Pessoas
            .AsNoTracking()
            .Include(p => p.Transacoes)
            .ToListAsync();

            var totaisPorPessoa = pessoas.Select(p =>
            {
                var receitas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor);

                var despesas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                return new TotalPessoaDto
                {
                    Pessoa = new PessoaDto
                    {
                        Id = p.Id,
                        Nome = p.Nome,
                        Idade = p.Idade
                    },
                    TotalReceitas = receitas,
                    TotalDespesas = despesas,
                    Saldo = receitas - despesas
                };
            }).ToList();

            var totalGeralReceitas = totaisPorPessoa.Sum(t => t.TotalReceitas);
            var totalGeralDespesas = totaisPorPessoa.Sum(t => t.TotalDespesas);

            return new TotaisByPessoaDto
            {
                Pessoas = totaisPorPessoa,
                TotalGeralReceitas = totalGeralReceitas,
                TotalGeralDespesas = totalGeralDespesas,
                SaldoLiquido = totalGeralReceitas - totalGeralDespesas
            };
        }

        //Realizar os calculos de totais por categoria
        public async Task<TotaisByCategoriaDto> GetTotalsByCategoriaAsync()
        {
            var categorias = await _dbCtx.Categorias
                .AsNoTracking()
                .Include(c => c.Transacoes)
                .ToListAsync();

            var totaisPorCategoria = categorias.Select(c =>
            {
                var receitas = c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor);

                var despesas = c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                return new TotalCategoriaDto
                {
                    Categoria = new CategoriaDto
                    {
                        Id = c.Id,
                        Descricao = c.Descricao,
                        Finalidade = c.Finalidade
                    },
                    TotalReceitas = receitas,
                    TotalDespesas = despesas,
                    Saldo = receitas - despesas
                };
            }).ToList();

            var totalGeralReceitas = totaisPorCategoria.Sum(t => t.TotalReceitas);
            var totalGeralDespesas = totaisPorCategoria.Sum(t => t.TotalDespesas);

            return new TotaisByCategoriaDto
            {
                Categorias = totaisPorCategoria,
                TotalGeralReceitas = totalGeralReceitas,
                TotalGeralDespesas = totalGeralDespesas,
                SaldoLiquido = totalGeralReceitas - totalGeralDespesas
            };
        }
    }
}
