using backend.DTOs;

namespace backend.Services
{
    public interface ITransacaoService
    {
        Task<(TransacaoDto?, string?)> CreateAsync(TransacaoCreateDto dto);
    }
}
