import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BrightFlow | Business Portal & CRM",
  description:
    "BrightFlow - Business Portal, CRM, Project Vault, Invoicing & Cash Flow Management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <AuthProvider>
          {children}
          <Toaster richColors position="top-center" closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
