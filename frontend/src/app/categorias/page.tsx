"use client";

import { useState } from "react";
import { Box, Card, CardContent, Alert } from "@mui/material";
import { useCategoria } from "@/hooks/useCategoria";
import { PageHeader } from "@/components/header";
import { CategoriaDialog } from "@/components/Categoria/CategoriaDialog";
import { CategoriaTable } from "@/components/Categoria/CategoriaTable";

export default function CategoriasPage() {
  const { categorias, loading, error, refresh } = useCategoria();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box>
      <PageHeader title="Categorias" onAdd={() => setIsDialogOpen(true)} />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <CategoriaTable data={categorias} loading={loading} />
        </CardContent>
      </Card>

      <CategoriaDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={refresh}
      />
    </Box>
  );
}
