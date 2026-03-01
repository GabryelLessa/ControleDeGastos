using System.ComponentModel.DataAnnotations;


namespace Backend.Models
{

    /// <summary>
    /// Representa a estrutura da tabela de Pessoas, com colunas Id, Nome, Idade e a relação 1-N com as Transacoes.
    /// </summary>
    public class Pessoa
    {
        // Identificador único
        [Key]
        public int Id { get; set; }

        // Nome da pessoa. Máximo de 200 caracteres.
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Nome { get; set; } = string.Empty;

        // <summary>Idade da pessoa.
        [Range(0, 150)]
        public int Idade {  get; set; }

        // Coleção de transações associadas a pessoa.
        public ICollection<Transacao> Transacoes { get; set; } = new HashSet<Transacao>();
    }
}
