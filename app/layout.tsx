import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Canarias Medcal - Gestión de Proyectos",
  description: "Sistema personal de notas y gestión de proyectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-gray-900">
        <div className="flex">
          {/* Barra lateral fija */}
          <Sidebar />

          {/* Contenido principal con margen izquierdo para no quedar oculto bajo el sidebar */}
          <main className="flex-1 ml-64 min-h-screen relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}