import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import SideNav from "./ui/sidenav/sidenav";
import { auth } from "@/auth";
import { EdgeStoreProvider } from "./lib/edgestroe";
import SessionProvider from './session-provider';

const robot_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={robot_mono.className}>
        <EdgeStoreProvider>
          <SessionProvider session={session}>
            <div className="flex px-1 sm:px-6 h-fit bg-white justify-center">
              {session?.user && <SideNav />}
              {children}
            </div>
          </SessionProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
