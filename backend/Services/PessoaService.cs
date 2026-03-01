using backend.DTOs;
using backend.Data;
using backend.Models;
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

        //Criar pessoa via estrutura no banco de dados
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

        //Deletar pessoa por ID
        public async Task<bool> DeleteAsync(int id)
        {
            var pessoa = await _dbCtx.Pessoas.FindAsync(id);
            if (pessoa is null) return false;

            _dbCtx.Pessoas.Remove(pessoa);
            await _dbCtx.SaveChangesAsync();
            return true;
        }

        //Atualizar dados de uma pessoa com ID especificado
        public async Task<bool> UpdateAsync(int id, PessoaUpsertDto dto)
        {
            var pessoa = await _dbCtx.Pessoas.FindAsync(id);
            if (pessoa is null) return false;

            pessoa.Nome = dto.Nome;
            pessoa.Idade = dto.Idade;
            await _dbCtx.SaveChangesAsync();
            return true;
        }

        //Metodo para listar as pessoas por ordem alfabética
        public async Task<IEnumerable<PessoaDto>> ListAsync()
        {
            return await _dbCtx.Pessoas
                .AsNoTracking()
                .OrderBy(p => p.Nome.ToLower())
                .Select(p => new PessoaDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Idade = p.Idade
                })
                .ToListAsync();
        }
    }
}
