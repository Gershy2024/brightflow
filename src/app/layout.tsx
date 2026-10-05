import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrightFlow | Custom Software. Smart Automation. Personal Support.",
  description:
    "BrightFlow - Custom Software, Smart Automation, and Personal Support for all your business applications, databases, and clients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
