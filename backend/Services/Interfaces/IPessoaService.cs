using backend.DTOs;

namespace backend.Services
{

    // Contrato específico para o serviço de Pessoas
    public interface IPessoaService
    {
        Task<PessoaDto?> GetByIdAsync(int id);
        Task<PessoaDto> CreateAsync(PessoaUpsertDto dto);
    }

}

