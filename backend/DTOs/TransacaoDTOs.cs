using backend.Models;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    //Foi feito em formato de classe para se adequar a documentação do scalar.

    /// <summary>DTO de resposta para Transação.Foi feito em formato de classe para se adequar a documentação do scalar. </summary>
    public class TransacaoDto
    {
        /// <summary>Identificador único. Ex: 1</summary>
        public int Id { get; set; }

        /// <summary>Descrição da transação. Máximo de 400 caracteres.</summary>
        public string? Descricao { get; set; }

        /// <summary> Valor da transferencia.</summary>
        public decimal Valor { get; set; }

        /// <summary> Tipo da transferencia [Despesa = 1,Receita = 2] .</summary>
        public TipoTransacao Tipo { get; set; }

        // <summary> Categoria da transferencia.</summary>
        public CategoriaDto? Categoria { get; set; }

        // <summary> Pessoa da transferencia.</summary>
        public PessoaDto? Pessoa { get; set; }
    }

    public class TransacaoCreateDto
    {
        /// <summary>Descrição da transação. Máximo de 400 caracteres.</summary>
        [Required, MinLength(1), MaxLength(400)]
        public string? Descricao { get; set; }

        /// <summary> Valor da transferencia.</summary>
        [Required, Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser positivo.")]
        public decimal Valor { get; set; }

        /// <summary> Tipo da transferencia [Despesa = 1,Receita = 2] .</summary>
        [Required]
        public TipoTransacao Tipo { get; set; }

        // <summary>Id da Categoria da transferencia.</summary>
        [Required]
        public int CategoriaId { get; set; }

        // <summary>Id da Pessoa da transferencia.</summary>
        [Required]
        public int PessoaId { get; set; }
    }
}
