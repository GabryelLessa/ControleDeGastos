using backend.DTOs;

namespace backend.Services
{
    // Contrato específico para os serviços de Totais
    public interface ITotaisService
    {
        Task<TotaisByPessoaDto> GetTotalsByPessoaAsync();
    }

}
