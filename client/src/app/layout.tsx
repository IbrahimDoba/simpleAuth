import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { UserContext, UserProvider } from "./hooks/userContext";

// components

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Auth App",
  description: "A login and Signup web App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={rubik.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
