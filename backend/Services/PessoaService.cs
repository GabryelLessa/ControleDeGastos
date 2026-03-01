using backend.DTOs;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class PessoaService: IPessoaService
    {
        //Injeção de dependencia do contexto do banco de dados
        private AppDbContext _dbCtx;
        public PessoaService(AppDbContext dbCtx)
        {
            _dbCtx = dbCtx;
        }

        //Buscar pessoa por ID
        public async Task<PessoaDto?> GetByIdAsync(int id)
        {
            var pessoa = await _dbCtx.Pessoas
                .Where(x => x.Id == id)
                .Select(p => new PessoaDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Idade = p.Idade
                })
                .FirstOrDefaultAsync();

            return pessoa;
        }

        //Criar pessoa via estrutura
        public async Task<PessoaDto> CreateAsync(PessoaUpsertDto dto)
        {
            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            _dbCtx.Pessoas.Add(pessoa);
            await _dbCtx.SaveChangesAsync();

            return new PessoaDto
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            };
        }
    }
}
