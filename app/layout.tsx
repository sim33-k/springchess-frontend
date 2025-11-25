import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {AsgardeoProvider} from '@asgardeo/nextjs/server';
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Spring Chess",
  description: "We all love chess!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        <AsgardeoProvider>{children}</AsgardeoProvider>
      </body>
    </html>
  );
}
