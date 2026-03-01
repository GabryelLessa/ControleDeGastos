using backend.DTOs;

namespace backend.Services
{
    // Contrato específico para o serviço de Transacoes
    public interface ITransacaoService
    {
        Task<(TransacaoDto?, string?)> CreateAsync(TransacaoCreateDto dto);
        Task<IEnumerable<TransacaoDto>> ListAsync();
    }
}
