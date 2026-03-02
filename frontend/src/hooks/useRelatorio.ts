import { useState, useEffect } from "react";
import { getTotaisPorCategoria, getTotaisPorPessoa } from "@/api/totalApi";
import { TotaisPorCategoriaDto, TotaisPorPessoaDto } from "@/types";

export function useRelatorios() {
  const [data, setData] = useState<{
    porPessoa: TotaisPorPessoaDto | null;
    porCategoria: TotaisPorCategoriaDto | null;
  }>({ porPessoa: null, porCategoria: null });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getTotaisPorPessoa(), getTotaisPorCategoria()])
      .then(([pp, pc]) => setData({ porPessoa: pp, porCategoria: pc }))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { ...data, loading, error };
}
