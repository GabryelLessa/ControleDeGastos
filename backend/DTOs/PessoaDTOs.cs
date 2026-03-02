using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    //Foi feito em formato de classe para se adequar a documentação do scalar.

    /// <summary>
    /// DTO para criação e edição de Pessoa.
    /// </summary>
    public class PessoaDto
    {
        /// <summary>Identificador único de cada Pessoa. Ex: 1</summary>
        public int Id { get; set; }

        /// <summary>Nome completo da pessoa. Ex: Gabryel Lessa</summary>
        [Required, MaxLength(200)]
        public string Nome { get; set; } = string.Empty;

        /// <summary>Idade da pessoa. Ex: 25</summary>
        [Range(0, 150)]
        public int Idade { get; set; }
    }


    /// <summary>
    /// DTO para criação e edição de Pessoa.
    /// </summary>
    public class PessoaUpsertDto
    {
        /// <summary>Nome completo da pessoa. Ex: Gabryel Lessa</summary>
        [Required, MaxLength(200)]
        public string Nome { get; set; } = string.Empty;

        /// <summary>Idade da pessoa. Ex: 25</summary>
        [Range(0, 150)]
        public int Idade { get; set; }
    }
}
