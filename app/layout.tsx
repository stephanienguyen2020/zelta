import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import InteractiveBackground from "./components/InteractiveBackground";
import GradientBackground from "./components/GradientBackground";
import { UserAvatar } from "./components/UserAvatar";
import { Toaster } from "./components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Zelta - Your Perfect AI Partner",
  description:
    "Find and connect with your ideal AI companion. Choose from a diverse range of personalities and create meaningful relationships.",
  icons: {
    icon: [
      {
        url: "/images/Zelta_logo.png",
        href: "/images/Zelta_logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InteractiveBackground>
          <GradientBackground>
            <div className="fixed top-8 right-8 z-50">
              <UserAvatar src="/images/Stephanie.jpg" size="md" />
            </div>
            <main className="relative">{children}</main>
          </GradientBackground>
        </InteractiveBackground>
        <Toaster />
      </body>
    </html>
  );
}
