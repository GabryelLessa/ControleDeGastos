import { useState, useEffect, useMemo } from "react";
import { getTransacoes } from "@/api/transacaoApi";
import { TransacaoDto, TipoTransacao } from "@/types";

export function useTransacao() {
  const [transacoes, setTransacoes] = useState<TransacaoDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getTransacoes();
      setTransacoes(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const receitas = transacoes
      .filter((t) => t.tipo === TipoTransacao.Receita)
      .reduce((s, t) => s + t.valor, 0);
    const despesas = transacoes
      .filter((t) => t.tipo === TipoTransacao.Despesa)
      .reduce((s, t) => s + t.valor, 0);
    return { receitas, despesas, saldo: receitas - despesas };
  }, [transacoes]);

  useEffect(() => {
    load();
  }, []);

  return { transacoes, stats, loading, error, refresh: load };
}
