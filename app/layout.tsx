import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accountability Grade App",
  description: "An app to grade your day with accountability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="three.r134.min.js" async></script>
        <script src="vanta.waves.min.js" async></script>
        <script src="vanta/dist/vanta.net.min" async></script>
      </head>
      <body className="bg-gray-900 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
