import { useState, useEffect } from "react";
import { getAllCategorias } from "@/api/categoriaApi";
import { CategoriaDto } from "@/types";

export function useCategoria() {
  const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAllCategorias();
      setCategorias(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { categorias, loading, error, refresh: load };
}
