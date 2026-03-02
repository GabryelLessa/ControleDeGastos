import { TotaisPorPessoaDto, TotaisPorCategoriaDto } from "@/types";
import { apiFetch } from "@/api/http";

//Busca os totais por pessoa
export const getTotaisPorPessoa = (): Promise<TotaisPorPessoaDto> =>
  apiFetch("/totais/by-pessoa");

//Busca os totais por categoria
export const getTotaisPorCategoria = (): Promise<TotaisPorCategoriaDto> =>
  apiFetch("/totais/by-categoria");
