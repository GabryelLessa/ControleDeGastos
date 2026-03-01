using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    /// <summary>
    /// Define as finalidades possíveis de uma categoria.Despesa - 1, Receita - 2, Ambas - 3
    /// </summary>
    public enum Finalidade
    {
        Despesa = 1,
        Receita = 2,
        Ambas = 3
    }


    public class Categoria
    {
        /// <summary>Identificador único gerado automaticamente (GUID).</summary>
        public int Id { get; set; }

        /// <summary>Descrição da categoria. Máximo de 400 caracteres.</summary>
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;

        /// <summary> Finalidade da categoria: Despesa, Receita ou Ambas.</summary>
        public Finalidade Finalidade { get; set; }

        /// <summary>Transações vinculadas a categoria.</summary>
        public ICollection<Transacao> Transacoes { get; set; } = new HashSet<Transacao>();
    }
}
