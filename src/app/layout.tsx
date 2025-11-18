// layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";
import ParallaxProvider from "@/components/ParallaxProvider";

export const metadata: Metadata = {
  title: "VecraHost - Best Minecraft Server Hosting India | VPS Hosting | Game. Host. Rule.",
  description:
    "VecraHost offers high-performance Minecraft and VPS hosting in India. Best Minecraft server hosting with DDoS protection, instant setup, and gamer-friendly features.",
  keywords:
    "vecrahost, minecraft server hosting india, best minecraft hosting, vps hosting india, game server hosting, affordable minecraft hosting, ddos protection minecraft, instant setup minecraft server, premium vps india, crossplay minecraft bedrock java",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white font-sans antialiased">
        <UserProvider>
          <ParallaxProvider>
            <Navbar />
            {children}
          </ParallaxProvider>
        </UserProvider>
      </body>
    </html>
  );
}
