import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import { TransacaoDto, TipoTransacao } from "@/types";
import { formatCurrency } from "@/api/utilsApi";

interface TransacoesTableProps {
  data: TransacaoDto[];
  loading: boolean;
}

export function TransacaoTable({ data, loading }: TransacoesTableProps) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Pessoa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{ py: 6, color: "text.secondary" }}
              >
                Nenhuma transação registrada.
              </TableCell>
            </TableRow>
          ) : (
            data.map((t) => {
              const isReceita = t.tipo === TipoTransacao.Receita;

              return (
                <TableRow key={t.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {t.descricao}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: #{t.id}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={isReceita ? "Receita" : "Despesa"}
                      size="small"
                      variant="outlined"
                      color={isReceita ? "success" : "error"}
                      sx={{ fontWeight: 500, borderRadius: "6px" }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      sx={{ color: isReceita ? "#16A34A" : "#DC2626" }}
                    >
                      {isReceita ? "" : "−"} {formatCurrency(t.valor)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {t.categoria?.descricao ?? "—"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {t.pessoa?.nome ?? "—"}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
