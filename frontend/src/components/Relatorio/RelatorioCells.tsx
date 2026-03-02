import { TableCell, Typography, TableRow } from "@mui/material";
import { formatCurrency } from "@/api/utilsApi";

export function SaldoCell({ value }: { value: number }) {
  return (
    <TableCell align="right">
      <Typography
        variant="body2"
        fontWeight={700}
        sx={{ color: value >= 0 ? "#16A34A" : "#DC2626" }}
      >
        {value >= 0 ? "+" : ""}
        {formatCurrency(value)}
      </Typography>
    </TableCell>
  );
}

export function TotalRow({
  label,
  receitas,
  despesas,
  saldo,
}: {
  label: string;
  receitas: number;
  despesas: number;
  saldo: number;
}) {
  return (
    <TableRow sx={{ bgcolor: "#F8FAFC" }}>
      <TableCell>
        <Typography variant="subtitle2" fontWeight={700}>
          {label}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2" fontWeight={700} color="success.main">
          {formatCurrency(receitas)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2" fontWeight={700} color="error.main">
          {formatCurrency(despesas)}
        </Typography>
      </TableCell>
      <SaldoCell value={saldo} />
    </TableRow>
  );
}
