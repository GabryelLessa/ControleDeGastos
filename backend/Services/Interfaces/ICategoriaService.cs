using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface ICategoriaService
    {
        Task<CategoriaDto> CreateAsync(CategoriaCreateDto dto);
        Task<IEnumerable<CategoriaDto>> ListByTypeAsync(TipoTransacao tipo);
    }
}
