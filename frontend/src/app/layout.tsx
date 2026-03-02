import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
