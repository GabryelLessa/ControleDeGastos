using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    /// <summary>
    /// Define o tipo de uma transação financeira, Despesa - 1, Receita -2.
    /// </summary>
    public enum TipoTransacao
    {
        Despesa = 1,
        Receita = 2
    }

    /// <summary>
    /// Representa a estrutura da tabela Transacoes, com colunas Id, Descricao, Valor, Tipo e as relacoes com Categoria e Pessoa.
    /// </summary>
    public class Transacao
    {
        // Identificador único.
        [Key]
        public int Id { get; set; }

        [MaxLength(400)]
        public string? Descricao { get; set; }

        // Valor da transação. Deve ser um número positivo.
        [Range(0.01, double.MaxValue)]
        public decimal Valor { get; set; }

        // Tipo da transação: Despesa ou Receita.
        public TipoTransacao Tipo { get; set; }

        // Referência da categoria da transação.
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; } = null!;

        // Referência da pessoa dona da transação.
        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; } = null!;
    }
}
