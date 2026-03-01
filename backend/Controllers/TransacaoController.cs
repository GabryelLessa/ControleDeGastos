using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("/transacao")]
    public class TransacaoController : Controller
    {
        //É uma boa prática utilizar interfaces e a injeção de dependência para desacoplar o serviço e não utilizar a instância do objeto direto
        ITransacaoService _service;

        public TransacaoController(ITransacaoService service)
        {
            _service = service;
        }

        /// <summary>
        /// # Criar Transacao.
        /// </summary>
        /// <remarks>
        /// Este endpoint cria uma transacao nova no banco de dados com um ID gerado automaticamente
        /// </remarks>
        /// <param name="dto">Dados da transacao a ser criada.</param>
        /// <response code="201">Categoria criada com sucesso e link de localização gerado.</response>
        /// <response code="400">Se o JSON enviado estiver inválido.</response>
        /// <response code="500">Se ocorrer um erro interno não mapeado.</response>
        [HttpPost]
        [ProducesResponseType(typeof(TransacaoCreateDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromBody] TransacaoCreateDto dto)
        {
            try
            {
                var transacaoCriada = await _service.CreateAsync(dto);
                // Retorna 422 se alguma regra de negócio for violada (menor com receita, categoria incompatível)
                if (transacaoCriada.Item2 is not null)
                {
                    return UnprocessableEntity(new { erro = transacaoCriada.Item2 });
                }
                return StatusCode(StatusCodes.Status201Created, transacaoCriada.Item1);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Não foi possivel criar a Transacao, verifique os dados e tente novamente");
            }
        }
    }
}
