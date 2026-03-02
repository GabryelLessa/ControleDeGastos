import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      placeholder="Buscar por nome..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{ mb: 2, width: { xs: "100%", sm: 300 } }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
}
