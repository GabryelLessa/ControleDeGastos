using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [ApiController]
    [Route("/categoria")]
    public class CategoriaController : ControllerBase
    {
        //É uma boa prática utilizar interfaces e a injeção de dependência para desacoplar o serviço e não utilizar a instância do objeto direto
        ICategoriaService _service;

        public CategoriaController(ICategoriaService service)
        {
            _service = service;
        }

        /// <summary>
        /// # Criar Categoria .
        /// </summary>
        /// <remarks>
        /// Este endpoint cria uma categoria nova no banco de dados com um ID gerado automaticamente
        /// </remarks>
        /// <param name="dto">Dados da categoria a ser criada.</param>
        /// <response code="201">Categoria criada com sucesso e link de localização gerado.</response>
        /// <response code="400">Se o JSON enviado estiver inválido.</response>
        /// <response code="500">Se ocorrer um erro interno não mapeado.</response>
        [HttpPost]
        [ProducesResponseType(typeof(CategoriaCreateDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromBody] CategoriaCreateDto dto)
        {
            try
            {
                var categoriaCriada = await _service.CreateAsync(dto);
                return StatusCode(StatusCodes.Status201Created, categoriaCriada);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Não foi possivel criar a Categoria, verifique os dados e tente novamente");
            }
        }

        /// <summary>
        /// # Listar Categoria
        /// </summary>
        /// <remarks>
        /// Este endpoint lista as Categorias por tipo de transacao .
        /// </remarks>
        /// <param name="tipo">
        ///  Despesa = 1, Receita = 2.
        /// </param>
        /// <response code="200">Categoria listada com sucesso.</response>
        /// <response code="500">Se ocorrer um erro interno não mapeado.</response>
        [HttpGet("tipo/{tipo}")]
        [ProducesResponseType(typeof(IEnumerable<CategoriaDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> List(TipoTransacao tipo)
        {
            try
            {
                var categoriaList = await _service.ListByTypeAsync(tipo);
                return StatusCode(StatusCodes.Status200OK, categoriaList);
            }
            catch
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "Ocorreu um erro ao listar as Categorias, verifique os dados e tente novamente"
                );
            }
        }
    }
}
