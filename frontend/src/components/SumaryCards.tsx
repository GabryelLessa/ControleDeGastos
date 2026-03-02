import { Stack, Card, CardContent, Typography } from "@mui/material";
import { formatCurrency } from "@/api/utilsApi";

interface SummaryCardsProps {
  receitas: number;
  despesas: number;
  saldo: number;
}

export function SummaryCards({ receitas, despesas, saldo }: SummaryCardsProps) {
  const items = [
    { label: "Receitas", value: receitas, color: "#16A34A", bg: "#F0FDF4" },
    { label: "Despesas", value: despesas, color: "#DC2626", bg: "#FEF2F2" },
    {
      label: "Saldo",
      value: saldo,
      color: saldo >= 0 ? "#16A34A" : "#DC2626",
      bg: saldo >= 0 ? "#F0FDF4" : "#FEF2F2",
    },
  ];

  return (
    <Stack direction="row" gap={2} mb={3}>
      {items.map((item) => (
        <Card
          key={item.label}
          sx={{ flex: 1, bgcolor: item.bg, border: "none", boxShadow: "none" }}
        >
          <CardContent sx={{ py: "12px !important" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              {item.label}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: item.color }}
            >
              {formatCurrency(item.value)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
