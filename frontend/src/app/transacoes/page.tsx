"use client";

import { useState } from "react";
import { Box, Card, CardContent, Alert } from "@mui/material";
import { useTransacao } from "@/hooks/useTransacao";
import { PageHeader } from "@/components/header";
import { SummaryCards } from "@/components/Transacao/SumaryCards";
import { TransacaoTable } from "@/components/Transacao/TransacaoTable";
import { TransacaoDialog } from "@/components/Transacao/TransacaoDialog";

export default function TransacoesPage() {
  const { transacoes, stats, loading, error, refresh } = useTransacao();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box>
      <PageHeader title="Transações" onAdd={() => setIsDialogOpen(true)} />

      {!loading && transacoes.length > 0 && <SummaryCards {...stats} />}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <TransacaoTable data={transacoes} loading={loading} />
        </CardContent>
      </Card>

      <TransacaoDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={refresh}
      />
    </Box>
  );
}
