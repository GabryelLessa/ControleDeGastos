import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { PessoaDto } from "@/types";

interface PessoasTableProps {
  data: PessoaDto[];
  loading: boolean;
  onEdit: (p: PessoaDto) => void;
  onDelete: (p: PessoaDto) => void;
}

const getInitials = (nome: string) =>
  nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
const avatarColors = ["#2563EB", "#7C3AED", "#059669", "#D97706", "#DC2626"];

export function PessoasTable({
  data,
  loading,
  onEdit,
  onDelete,
}: PessoasTableProps) {
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
            <TableCell>Pessoa</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Perfil</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ py: 6, color: "text.secondary" }}
              >
                Nenhuma pessoa encontrada.
              </TableCell>
            </TableRow>
          ) : (
            data.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Avatar
                      sx={{
                        bgcolor: avatarColors[p.id % 5],
                        width: 34,
                        height: 34,
                        fontSize: "0.8rem",
                      }}
                    >
                      {getInitials(p.nome)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {p.nome}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        #{p.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{p.idade} anos</TableCell>
                <TableCell>
                  <Chip
                    label={p.idade < 18 ? "Menor de idade" : "Maior de idade"}
                    color={p.idade < 18 ? "warning" : "success"}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      onClick={() => onEdit(p)}
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      size="small"
                      onClick={() => onDelete(p)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
