import { TransacaoCreateDto, TransacaoDto } from "@/types";
import { apiFetch } from "@/api/http";

//Busca transações
export const getTransacoes = (): Promise<TransacaoDto[]> =>
  apiFetch("/transacao");

//Cria transações
export const createTransacao = (
  data: TransacaoCreateDto,
): Promise<TransacaoDto> =>
  apiFetch("/transacao", { method: "POST", body: JSON.stringify(data) });
