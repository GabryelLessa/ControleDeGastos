import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { createPessoa, updatePessoa } from "@/api/pessoaApi";
import { PessoaDto, PessoaUpsertDto } from "@/types";

interface PessoaDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  target?: PessoaDto | null;
}

export function PessoaDialog({
  open,
  onClose,
  onSuccess,
  target,
}: PessoaDialogProps) {
  const [form, setForm] = useState<PessoaUpsertDto>({ nome: "", idade: 0 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (target) setForm({ nome: target.nome, idade: target.idade });
    else setForm({ nome: "", idade: 0 });
  }, [target, open]);

  const handleSave = async () => {
    if (!form.nome.trim()) return setError("Nome é obrigatório.");
    try {
      setSaving(true);
      target ? await updatePessoa(target.id, form) : await createPessoa(form);
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{target ? "Editar" : "Nova"} Pessoa</DialogTitle>
      <DialogContent>
        <Stack gap={2} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <TextField
            label="Idade"
            type="number"
            value={form.idade}
            onChange={(e) =>
              setForm({ ...form, idade: Number(e.target.value) })
            }
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
