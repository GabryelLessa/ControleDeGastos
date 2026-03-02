export enum TipoTransacao {
  Despesa = 1,
  Receita = 2,
}

export enum Finalidade {
  Despesa = 1,
  Receita = 2,
  Ambas = 3,
}

export interface PessoaDto {
  id: number;
  nome: string;
  idade: number;
}

export interface PessoaUpsertDto {
  nome: string;
  idade: number;
}

export interface CategoriaDto {
  id: number;
  descricao: string;
  finalidade: Finalidade;
}

export interface CategoriaCreateDto {
  descricao: string;
  finalidade: Finalidade;
}

export interface TransacaoDto {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoria: CategoriaDto | null;
  pessoa: PessoaDto | null;
}

export interface TransacaoCreateDto {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: number;
  pessoaId: number;
}

export interface TotalPessoaDto {
  pessoa: PessoaDto;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisPorPessoaDto {
  pessoas: TotalPessoaDto[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquido: number;
}

export interface TotalCategoriaDto {
  categoria: CategoriaDto;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisPorCategoriaDto {
  categorias: TotalCategoriaDto[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquido: number;
}
