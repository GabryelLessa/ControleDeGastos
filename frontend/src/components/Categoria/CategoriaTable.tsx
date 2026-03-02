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
import { CategoriaDto, Finalidade } from "@/types";
import { finalidadeLabel } from "@/api/labels";

const finalidadeColor: Record<Finalidade, "error" | "success" | "info"> = {
  [Finalidade.Despesa]: "error",
  [Finalidade.Receita]: "success",
  [Finalidade.Ambas]: "info",
};

interface CategoriasTableProps {
  data: CategoriaDto[];
  loading: boolean;
}

export function CategoriaTable({ data, loading }: CategoriasTableProps) {
  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Finalidade</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                sx={{ py: 6, color: "text.secondary" }}
              >
                Nenhuma categoria cadastrada.
              </TableCell>
            </TableRow>
          ) : (
            data.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {c.descricao}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={finalidadeLabel[c.finalidade]}
                    color={finalidadeColor[c.finalidade]}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="caption" color="text.secondary">
                    #{c.id}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
