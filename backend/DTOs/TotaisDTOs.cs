namespace backend.DTOs
{
    /// <summary>Totais financeiros de uma pessoa específica.</summary>
    public class TotalPessoaDto
    {
        /// <summary>Pessoa associada aos totais.</summary>
        public PessoaDto Pessoa { get; set; } = default!;

        /// <summary>Total de receitas da pessoa.</summary>
        public decimal TotalReceitas { get; set; }

        /// <summary>Total de despesas da pessoa.</summary>
        public decimal TotalDespesas { get; set; }

        /// <summary>Saldo da pessoa (TotalReceitas - TotalDespesas).</summary>
        public decimal Saldo { get; set; }
    }

    /// <summary>Resultado consolidado da consulta de totais por pessoa.</summary>
    public class TotaisByPessoaDto
    {
        /// <summary>Lista de totais por pessoa.</summary>
        public IEnumerable<TotalPessoaDto> Pessoas { get; set; } = [];

        /// <summary>Total geral de receitas.</summary>
        public decimal TotalGeralReceitas { get; set; }

        /// <summary>Total geral de despesas.</summary>
        public decimal TotalGeralDespesas { get; set; }

        /// <summary>Saldo líquido global (TotalGeralReceitas - TotalGeralDespesas).</summary>
        public decimal SaldoLiquido { get; set; }
    }
}
