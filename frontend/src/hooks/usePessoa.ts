import { useEffect, useState } from "react";
import { PessoaDto } from "@/types";
import { getPessoas } from "@/api/pessoaApi";

export function usePessoas() {
  const [pessoas, setPessoas] = useState<PessoaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getPessoas();
      setPessoas(data ?? []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { pessoas, loading, error, refresh: load };
}
