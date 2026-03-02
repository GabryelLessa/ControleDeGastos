import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { createCategoria } from "@/api/categoriaApi";
import { CategoriaCreateDto, Finalidade } from "@/types";

interface CategoriaDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CategoriaDialog({
  open,
  onClose,
  onSuccess,
}: CategoriaDialogProps) {
  const [form, setForm] = useState<CategoriaCreateDto>({
    descricao: "",
    finalidade: Finalidade.Despesa,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!form.descricao.trim()) return setError("Descrição é obrigatória.");
    try {
      setSaving(true);
      setError(null);
      await createCategoria(form);
      setForm({ descricao: "", finalidade: Finalidade.Despesa });
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Categoria</DialogTitle>
      <DialogContent>
        <Stack gap={2} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            fullWidth
            multiline
            rows={2}
            inputProps={{ maxLength: 400 }}
            helperText={`${form.descricao.length}/400`}
            autoFocus
          />
          <FormControl fullWidth>
            <InputLabel>Finalidade</InputLabel>
            <Select
              value={form.finalidade}
              label="Finalidade"
              onChange={(e) =>
                setForm({ ...form, finalidade: e.target.value as Finalidade })
              }
            >
              <MenuItem value={Finalidade.Despesa}>Despesa</MenuItem>
              <MenuItem value={Finalidade.Receita}>Receita</MenuItem>
              <MenuItem value={Finalidade.Ambas}>Ambas</MenuItem>
            </Select>
            <FormHelperText>
              Define onde esta categoria será usada
            </FormHelperText>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? <CircularProgress size={18} /> : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
