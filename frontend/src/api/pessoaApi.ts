import { PessoaDto, PessoaUpsertDto } from "@/types";
import { apiFetch } from "@/api/http";

// Obter Pessoa por ID
export const getPessoaById = (id: number): Promise<PessoaDto> =>
  apiFetch(`/pessoas/${id}`);

// Recebe uma lista de pessoas contidas no banco de dados
export const getPessoas = (): Promise<PessoaDto[]> => {
  return apiFetch("/pessoas");
};

//Criar Pessoa
export const createPessoa = (data: PessoaUpsertDto): Promise<PessoaDto> =>
  apiFetch("/pessoas", { method: "POST", body: JSON.stringify(data) });

//Atualiza os dados da Pessoa
export const updatePessoa = (
  id: number,
  data: PessoaUpsertDto,
): Promise<void> =>
  apiFetch(`/pessoas/${id}`, { method: "PUT", body: JSON.stringify(data) });

//Deleta pessoas
export const deletePessoa = (id: number): Promise<void> =>
  apiFetch(`/pessoas/${id}`, { method: "DELETE" });
