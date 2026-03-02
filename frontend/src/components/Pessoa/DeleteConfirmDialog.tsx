import { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { deletePessoa } from "@/api/pessoaApi";

interface DeleteConfirmDialogProps {
  target: { id: number; nome: string } | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteConfirmDialog({
  target,
  onClose,
  onSuccess,
}: DeleteConfirmDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!target) return;
    try {
      setLoading(true);
      setError(null);
      await deletePessoa(target.id);
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e.message || "Erro ao excluir registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!target} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirmar exclusão</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="body1">
          Tem certeza que deseja excluir <strong>{target?.nome}</strong>?
        </Typography>
        <Alert severity="warning" sx={{ mt: 2 }}>
          Esta ação removerá também todas as transações vinculadas.
        </Alert>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? <CircularProgress size={18} /> : "Excluir"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
