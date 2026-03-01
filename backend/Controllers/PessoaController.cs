using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [ApiController]
    [Route("/pessoas")]
    public class PessoaController : Controller
    {
        //É uma boa prática utilizar interfaces e a injeção de dependência para desacoplar o serviço e não utilizar a instância do objeto direto
        private IPessoaService _service;
        public PessoaController(IPessoaService service)
        {
            _service = service;
        }

        /// <summary>
        /// # Obter Pessoa por ID
        /// </summary>
        /// <remarks>
        /// Este endpoint retorna um objeto **PessoaDto** referente ao seu ID no banco de dados. 
        /// </remarks>
        /// <param name="id">O ID da pessoa a ser pesquisada.</param>
        /// <response code="200">Retorna a pessoa encontrada.</response>
        /// <response code="404">Se o ID informado não existir.</response>
        /// <response code="500">Se ocorrer um erro interno não mapeado.</response>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(PessoaDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var pessoa = await _service.GetByIdAsync(id);
                return pessoa is null ? NotFound() : Ok(pessoa);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Não foi possivel obter usuário, verifique os dados e tente novamente");
            }
        }

        /// <summary>
        /// # Criar Pessoa.
        /// </summary>
        /// <remarks>
        /// Este endpoint cria uma pessoa nova no banco de dados com um ID gerado automaticamente
        /// </remarks>
        /// <param name="dto">Dados da pessoa a ser criada.</param>
        /// <response code="201">Pessoa criada com sucesso e link de localização gerado.</response>
        /// <response code="400">Se o JSON enviado estiver inválido.</response>
        /// <response code="500">Se ocorrer um erro interno não mapeado.</response>
        [HttpPost]
        [ProducesResponseType(typeof(PessoaUpsertDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromBody] PessoaUpsertDto dto)
        {
            try
            {
                var pessoaCriada = await _service.CreateAsync(dto);
                // é recomendado como boas praticas devolver no locations o link para se obter o objeto criado quando há comando api correspondente, bem como o status 201 e não 200
                return CreatedAtAction(nameof(GetById), new { id = pessoaCriada.Id }, pessoaCriada);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Não foi possivel criar a Pessoa, verifique os dados e tente novamente");
            }

        }


    }
}
