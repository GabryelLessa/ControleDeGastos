using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CategoriaService : ICategoriaService
    {
        //Injeção de dependencia do contexto do banco de dados
        private AppDbContext _dbCtx;

        public CategoriaService(AppDbContext dbCtx)
        {
            _dbCtx = dbCtx;
        }

        //Criar categoria via estrutura no banco de dados
        public async Task<CategoriaDto> CreateAsync(CategoriaCreateDto dto)
        {
            var categoria = new Categoria
            {
                Descricao = dto.Descricao!,
                Finalidade = dto.Finalidade
            };

            _dbCtx.Categorias.Add(categoria);
            await _dbCtx.SaveChangesAsync();

            return new CategoriaDto
            {
                Id = categoria.Id,
                Descricao = categoria.Descricao,
                Finalidade = categoria.Finalidade,
            };
        }

        // Metodo para listar cateogeria por tipo de transacao
        public async Task<IEnumerable<CategoriaDto>> ListByTypeAsync(TipoTransacao tipo)
        {
            var query = _dbCtx.Categorias
                .AsNoTracking()
                .Where(c =>
                    c.Finalidade == Finalidade.Ambas ||
                    (tipo == TipoTransacao.Despesa && c.Finalidade == Finalidade.Despesa) ||
                    (tipo == TipoTransacao.Receita && c.Finalidade == Finalidade.Receita)
                );

            query = tipo switch
            {
                TipoTransacao.Despesa => query.OrderByDescending(c => c.Descricao),
                TipoTransacao.Receita => query.OrderBy(c => c.Descricao),
                _ => query.OrderBy(c => c.Descricao)
            };

            return await query
                .Select(c => new CategoriaDto
                {
                    Id = c.Id,
                    Descricao = c.Descricao,
                    Finalidade = c.Finalidade,
                })
                .ToListAsync();
        }
    }
}
