import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Alert,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { createTransacao } from "@/api/transacaoApi";
import { getPessoas } from "@/api/pessoaApi";
import { getCategoriasByTipo } from "@/api/categoriaApi";
import {
  CategoriaDto,
  PessoaDto,
  TipoTransacao,
  TransacaoCreateDto,
} from "@/types";

interface TransacaoDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const emptyForm: TransacaoCreateDto = {
  descricao: "",
  valor: 0,
  tipo: TipoTransacao.Despesa,
  categoriaId: 0,
  pessoaId: 0,
};

export function TransacaoDialog({
  open,
  onClose,
  onSuccess,
}: TransacaoDialogProps) {
  const [form, setForm] = useState<TransacaoCreateDto>(emptyForm);
  const [pessoas, setPessoas] = useState<PessoaDto[]>([]);
  const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const pessoaSelecionada = pessoas.find((p) => p.id === form.pessoaId);
  const isMenor = pessoaSelecionada && pessoaSelecionada.idade < 18;

  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      Promise.all([
        getPessoas(),
        getCategoriasByTipo(TipoTransacao.Despesa),
      ]).then(([p, c]) => {
        setPessoas(p);
        setCategorias(c);
      });
    }
  }, [open]);

  const handlePessoaChange = async (id: number) => {
    const p = pessoas.find((x) => x.id === id);
    const novoTipo = p && p.idade < 18 ? TipoTransacao.Despesa : form.tipo;
    setForm((prev) => ({
      ...prev,
      pessoaId: id,
      tipo: novoTipo,
      categoriaId: 0,
    }));
    setCategorias(await getCategoriasByTipo(novoTipo));
  };

  const handleTipoChange = async (tipo: TipoTransacao) => {
    setForm((prev) => ({ ...prev, tipo, categoriaId: 0 }));
    setCategorias(await getCategoriasByTipo(tipo));
  };

  const handleSave = async () => {
    if (
      !form.descricao ||
      form.valor <= 0 ||
      !form.categoriaId ||
      !form.pessoaId
    ) {
      return setError("Preencha todos os campos corretamente.");
    }
    try {
      setSaving(true);
      await createTransacao(form);
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
      <DialogTitle>Nova Transação</DialogTitle>
      <DialogContent>
        <Stack gap={2.5} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Descrição"
            fullWidth
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />

          <TextField
            label="Valor"
            type="number"
            fullWidth
            value={form.valor || ""}
            onChange={(e) =>
              setForm({ ...form, valor: parseFloat(e.target.value) || 0 })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Pessoa</InputLabel>
            <Select
              value={form.pessoaId || ""}
              label="Pessoa"
              onChange={(e) => handlePessoaChange(Number(e.target.value))}
            >
              {pessoas.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.nome} {p.idade < 18 ? "(Menor)" : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {isMenor && (
            <Alert severity="warning" variant="outlined">
              Menores de 18 anos só registram despesas.
            </Alert>
          )}

          <FormControl fullWidth disabled={!!isMenor}>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={form.tipo}
              label="Tipo"
              onChange={(e) =>
                handleTipoChange(e.target.value as TipoTransacao)
              }
            >
              <MenuItem value={TipoTransacao.Despesa}>Despesa</MenuItem>
              <MenuItem value={TipoTransacao.Receita}>Receita</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={form.categoriaId || ""}
              label="Categoria"
              onChange={(e) =>
                setForm({ ...form, categoriaId: Number(e.target.value) })
              }
            >
              {categorias.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? <CircularProgress size={18} /> : "Registrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
