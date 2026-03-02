import { createTheme, ThemeOptions } from "@mui/material/styles";

//Uma paleta de cores azul com cinza que funciona bem, utilizei ela em outros
const COLORS = {
  brand: "#2563EB",
  surface: "#FFFFFF",
  background: "#F1F5F9",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  border: "rgba(0, 0, 0, 0.08)",
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: COLORS.brand,
      contrastText: "#FFFFFF",
    },
    background: {
      default: COLORS.background,
      paper: COLORS.surface,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${COLORS.border}`,
          boxShadow: "none",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
