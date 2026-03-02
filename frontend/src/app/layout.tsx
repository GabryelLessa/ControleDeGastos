import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import Sidebar from "@/components/Sidebar";

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
      <body style={{ margin: 0 }} suppressHydrationWarning>
        <ThemeRegistry>
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />

            <main
              style={{
                flexGrow: 1,
                marginLeft: "240px",
                padding: "32px",
                minHeight: "100vh",
                backgroundColor: "#f8fafc",
              }}
            >
              {children}
            </main>
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
