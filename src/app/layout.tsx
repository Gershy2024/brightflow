import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BrightFlow — Digital Studio | Custom Websites & Web Applications",
  description:
    "Independent digital studio designing and building custom websites, member portals, and business platforms for growing organizations.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans text-[#121316] bg-[#FAF8F5] dark:text-[#F3F3F5] dark:bg-[#0E1015]">
        <AuthProvider>
          {children}
          <Toaster richColors position="top-center" closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
