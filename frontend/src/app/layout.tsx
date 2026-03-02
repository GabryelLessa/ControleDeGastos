import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Controle de Gastos",
  description: "Sistema de controle financeiro residencial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          <Box
            sx={{
              display: "flex",
              minHeight: "100vh",
              bgcolor: "background.default",
            }}
          >
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                ml: "240px",
                p: { xs: 2, md: 4 },
                minHeight: "100vh",
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
