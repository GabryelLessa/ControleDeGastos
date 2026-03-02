"use client";

import { useState } from "react";
import { Box, Card, CardContent } from "@mui/material";
import { PessoaDto } from "@/types";
import { usePessoas } from "@/hooks/usePessoa";
import { PessoaDialog } from "@/components/Pessoa/PessoaDialog";
import { PageHeader } from "@/components/header";
import { SearchBar } from "@/components/Pessoa/SearchBar";
import { PessoasTable } from "@/components/Pessoa/PessoaTable";
import { DeleteConfirmDialog } from "@/components/Pessoa/DeleteConfirmDialog";

export default function PessoasPage() {
  const { pessoas, loading, refresh } = usePessoas();
  const [search, setSearch] = useState("");

  // Estados para os diálogos
  const [formDialog, setFormDialog] = useState<{
    open: boolean;
    target: PessoaDto | null;
  }>({ open: false, target: null });
  const [deleteTarget, setDeleteTarget] = useState<PessoaDto | null>(null);

  const filtered = pessoas.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box>
      <PageHeader
        title="Pessoas"
        onAdd={() => setFormDialog({ open: true, target: null })}
      />

      <Card>
        <CardContent>
          <SearchBar value={search} onChange={setSearch} />

          <PessoasTable
            data={filtered}
            loading={loading}
            onEdit={(p) => setFormDialog({ open: true, target: p })}
            onDelete={(p) => setDeleteTarget(p)} // Recebe o objeto completo da pessoa
          />
        </CardContent>
      </Card>

      {/* Diálogo de Criar/Editar */}
      <PessoaDialog
        open={formDialog.open}
        target={formDialog.target}
        onClose={() => setFormDialog({ ...formDialog, open: false })}
        onSuccess={refresh}
      />

      {/* NOVO: Diálogo de Confirmação de Exclusão */}
      <DeleteConfirmDialog
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSuccess={refresh}
      />
    </Box>
  );
}
