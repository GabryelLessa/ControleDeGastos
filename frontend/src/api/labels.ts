import { Finalidade, TipoTransacao } from "@/types";

// Labels para as estruturas de enum
export const finalidadeLabel: Record<Finalidade, string> = {
  [Finalidade.Despesa]: "Despesa",
  [Finalidade.Receita]: "Receita",
  [Finalidade.Ambas]: "Ambas",
};

export const tipoTransacaoLabel: Record<TipoTransacao, string> = {
  [TipoTransacao.Despesa]: "Despesa",
  [TipoTransacao.Receita]: "Receita",
};
