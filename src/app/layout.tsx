import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Perrine Dupriez Sophrologie",
  description: "Sophrologue à Denain",
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">

      <body
        className={'font-sans text-black'}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}



