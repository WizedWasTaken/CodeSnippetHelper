"use client";

import Header from "@/components/pages/Header/Header";
import "./globals.scss";
import { useSession, getSession, Session } from "@/lib/utils/session";
import { useEffect } from "react";
import { User } from "@/entities/User";
import Theme from "@/lib/utils/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, updateSession } = useSession();

  useEffect(() => {
    const storedSession = getSession();

    if (storedSession?.user?.UserId) {
      // Use getter 'UserId' instead of directly accessing 'userId'
      const userInstance = new User(
        storedSession.user.UserId, // Use getter 'UserId'
        storedSession.user.Name, // Use getter 'Name'
        storedSession.user.Email, // Use getter 'Email'
        storedSession.user.Password // Use getter 'Password'
      );

      if (!session || session.user.UserId !== userInstance.UserId) {
        updateSession(new Session(userInstance)); // Update only if the session has changed
      }
    }
  }, [session, updateSession]);

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
