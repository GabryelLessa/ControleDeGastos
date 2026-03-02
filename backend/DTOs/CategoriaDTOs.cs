using backend.Models;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    //Foi feito em formato de classe para se adequar a documentação do scalar.

    /// <summary>
    /// DTO para criação e resposta de Categoria. Foi feito em formato de classe para se adequar a documentação do scalar
    /// </summary>
    public class CategoriaDto
    {
        /// <summary>Identificador único da categoria. Ex: 1</summary>
        public int Id { get; set; }

        /// <summary>Descrição da categoria. Máximo de 400 caracteres.</summary>
        public string? Descricao { get; set; }

        /// <summary>Finalidade da categoria. Despesa - 1, Receita - 2, Ambas - 3</summary>
        public Finalidade Finalidade { get; set; }
    }

    public class CategoriaCreateDto
    {
        /// <summary>Descrição da categoria. Máximo de 400 caracteres.</summary>
        [Required, MaxLength(400)]
        public string? Descricao { get; set; }

        /// <summary>Finalidade da categoria. Despesa - 1, Receita - 2, Ambas - 3</summary>
        [Required]
        public Finalidade Finalidade { get; set; }

    }
}
