import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BrightFlow | Intelligent Business Automation & Client Hub",
  description:
    "Put your business on autopilot. Bespoke workflow automation, CRM pipelines, instant quote-to-cash invoicing, and smart telephony.",
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" translate="no" className="notranslate" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <AuthProvider>
          {children}
          <Toaster richColors position="top-center" closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
