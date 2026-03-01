using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TransacaoService : ITransacaoService
    {
        private AppDbContext _dbCtx;

        public TransacaoService(AppDbContext dbContext)
        {
            _dbCtx = dbContext;
        }

        // Cria uma transação no banco de dados respeitandoa as regras de negócio
        public async Task<(TransacaoDto?, string?)> CreateAsync(TransacaoCreateDto dto)
        {
            var pessoa = await _dbCtx.Pessoas.FindAsync(dto.PessoaId);
            if (pessoa is null)
            {
                return (null, "Pessoa não encontrada.");
            }

            var categoria = await _dbCtx.Categorias.FindAsync(dto.CategoriaId);
            if (categoria is null)
            {
                return (null, "Categoria não encontrada.");
            }

            // Regra: menor de 18 anos não pode ter receitas
            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
            {
                return (null, "Menores de 18 anos só podem registrar despesas.");
            }

            // Regra: categoria incompatível com o tipo da transação
            bool categoriaIncompativel =
                (dto.Tipo == TipoTransacao.Despesa && categoria.Finalidade == Finalidade.Receita) ||
                (dto.Tipo == TipoTransacao.Receita && categoria.Finalidade == Finalidade.Despesa);

            if (categoriaIncompativel)
            {
                return (null,
                    $"A categoria '{categoria.Descricao}' (finalidade: {categoria.Finalidade}) " +
                    $"não é compatível com o tipo '{dto.Tipo}'.");
            }

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                CategoriaId = dto.CategoriaId,
                PessoaId = dto.PessoaId
            };

            _dbCtx.Transacoes.Add(transacao);

            await _dbCtx.SaveChangesAsync();
            await _dbCtx.Entry(transacao).Reference(t => t.Categoria).LoadAsync();
            await _dbCtx.Entry(transacao).Reference(t => t.Pessoa).LoadAsync();

            return (MapToDto(transacao), null);

        }

        //Metodo que apenas lista as transações
        public async Task<IEnumerable<TransacaoDto>> ListAsync()
        {
            return await _dbCtx.Transacoes
                .AsNoTracking()
                .Include(t => t.Categoria)
                .Include(t => t.Pessoa)
                .Select(t => MapToDto(t))
                .ToListAsync();
        }

        //Metodo auxiliar para fazer o map entre as DTOs, precisa ser estatico por conta do Entity Framework
        private static TransacaoDto MapToDto(Transacao t)
        {
            return new TransacaoDto
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                Tipo = t.Tipo,

                Categoria = new CategoriaDto
                {
                    Id = t.Categoria.Id,
                    Descricao = t.Categoria.Descricao,
                    Finalidade = t.Categoria.Finalidade
                },

                Pessoa = new PessoaDto
                {
                    Id = t.Pessoa.Id,
                    Nome = t.Pessoa.Nome,
                    Idade = t.Pessoa.Idade
                }
            };
        }
    }
}
