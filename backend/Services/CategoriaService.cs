using backend.DTOs;
using Backend.Data;
using Backend.Models;

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
    }
}
