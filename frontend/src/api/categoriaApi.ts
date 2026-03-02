import { TipoTransacao, CategoriaDto, CategoriaCreateDto } from "@/types";
import { apiFetch } from "@/api/http";

// Buscar categoria por tipo
export const getCategoriasByTipo = (
  tipo: TipoTransacao,
): Promise<CategoriaDto[]> => apiFetch(`/categoria/tipo/${tipo}`);

// Buscar categorias armazenadas no banco de dados
export const getAllCategorias = async (): Promise<CategoriaDto[]> => {
  const [despesas, receitas] = await Promise.all([
    getCategoriasByTipo(TipoTransacao.Despesa),
    getCategoriasByTipo(TipoTransacao.Receita),
  ]);
  const map = new Map<number, CategoriaDto>();
  [...despesas, ...receitas].forEach((c) => map.set(c.id, c));
  return Array.from(map.values());
};

// Cria categoria
export const createCategoria = (
  data: CategoriaCreateDto,
): Promise<CategoriaDto> =>
  apiFetch("/categoria", { method: "POST", body: JSON.stringify(data) });
