"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { useRelatorios } from "@/hooks/useRelatorio";
import { SummaryCards } from "@/components//SumaryCards"; // Reuso!
import { RelatorioTable } from "@/components/Relatorio/RelatorioTable";

export default function RelatoriosPage() {
  const [tab, setTab] = useState(0);
  const { porPessoa, porCategoria, loading, error } = useRelatorios();

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4">Relatórios</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {porPessoa && (
        <SummaryCards
          receitas={porPessoa.totalGeralReceitas}
          despesas={porPessoa.totalGeralDespesas}
          saldo={porPessoa.saldoLiquido}
        />
      )}

      <Card>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
        >
          <Tab label="Por Pessoa" />
          <Tab label="Por Categoria" />
        </Tabs>

        <CardContent>
          {tab === 0 && porPessoa && (
            <RelatorioTable
              items={porPessoa.pessoas}
              totalGeral={{
                receitas: porPessoa.totalGeralReceitas,
                despesas: porPessoa.totalGeralDespesas,
                saldo: porPessoa.saldoLiquido,
              }}
              type="pessoa"
            />
          )}

          {tab === 1 && porCategoria && (
            <RelatorioTable
              items={porCategoria.categorias}
              totalGeral={{
                receitas: porCategoria.totalGeralReceitas,
                despesas: porCategoria.totalGeralDespesas,
                saldo: porCategoria.saldoLiquido,
              }}
              type="categoria"
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
