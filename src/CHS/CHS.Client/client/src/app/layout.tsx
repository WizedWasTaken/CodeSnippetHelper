"use client";

import Header from "@/components/pages/Header/Header";
import "./globals.scss";
import Theme from "@/lib/utils/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark antialiased min-h-screen max-w-screen flex flex-col overflow-x-hidden">
        <Theme>
          <Header />
          {children}
        </Theme>
      </body>
    </html>
  );
}
