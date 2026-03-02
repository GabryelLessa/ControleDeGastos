import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatCurrency } from "@/api/utilsApi";
import { SaldoCell, TotalRow } from "./RelatorioCells";

interface RelatorioTableProps {
  items: any[];
  totalGeral: { receitas: number; despesas: number; saldo: number };
  type: "pessoa" | "categoria";
}

export function RelatorioTable({
  items,
  totalGeral,
  type,
}: RelatorioTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{type === "pessoa" ? "Pessoa" : "Categoria"}</TableCell>
            <TableCell>Receitas</TableCell>
            <TableCell>Despesas</TableCell>
            <TableCell align="right">Saldo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            const rowKey =
              type === "pessoa" ? item.pessoa.id : item.categoria.id;

            return (
              <TableRow key={rowKey} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {type === "pessoa"
                      ? item.pessoa.nome
                      : item.categoria.descricao}
                  </Typography>
                  {type === "pessoa" && (
                    <Typography variant="caption" color="text.secondary">
                      {item.pessoa.idade} anos
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main">
                    {formatCurrency(item.totalReceitas)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="error.main">
                    {formatCurrency(item.totalDespesas)}
                  </Typography>
                </TableCell>
                <SaldoCell value={item.saldo} />
              </TableRow>
            );
          })}

          <TotalRow label="Total consolidado" {...totalGeral} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
