using backend.DTOs;

namespace backend.Services
{
    public interface ICategoriaService
    {
        Task<CategoriaDto> CreateAsync(CategoriaCreateDto dto);
    }
}
