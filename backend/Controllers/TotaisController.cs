using backend.Services;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;

namespace backend.Controllers
{
    [ApiController]
    [Route("/totais")]
    public class TotaisController : ControllerBase
    {
        private readonly ITotaisService _service;
        public TotaisController(ITotaisService service)
        {
            _service = service;
        }

        /// <summary>
        /// # Totais financeiros por pessoa
        /// </summary>
        /// <remarks>
        /// Retorna os totais financeiros consolidados por pessoa
        /// </remarks>
        [ProducesResponseType(typeof(TotaisByPessoaDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet("by-pessoa")]
        public async Task<IActionResult> ByPessoa()
        {
            try
            {
                var total = await _service.GetTotalsByPessoaAsync();
                return StatusCode(StatusCodes.Status200OK, total);
            }
            catch
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "Ocorreu um erro buscar os dados da pessoa"
                );
            }
        }

        /// <summary>
        /// # Totais financeiros por categoria
        /// </summary>
        /// <remarks>
        /// Retorna os totais financeiros consolidados por categoria,
        /// </remarks>
        [ProducesResponseType(typeof(TotaisByCategoriaDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet("by-categoria")]
        public async Task<IActionResult> ByCategoria()
        {
            try
            {
                var total = await _service.GetTotalsByCategoriaAsync();
                return StatusCode(StatusCodes.Status200OK, total);
            }
            catch
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "Ocorreu um erro buscar os dados da pessoa"
                );
            }
        }
    }
}
