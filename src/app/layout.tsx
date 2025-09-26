// layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "VecraHost - Game. Host. Rule.",
  description:
    "VecraHost offers high-performance Minecraft and VPS hosting with a modern gaming aesthetic.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white font-sans antialiased">
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
