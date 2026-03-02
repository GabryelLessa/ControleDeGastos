// ============================================================
// app/page.tsx
// Página raiz — redireciona para /pessoas automaticamente.
// ============================================================

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/pessoas");
}
