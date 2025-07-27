import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RunClub Directory - Find Running Clubs Near You",
  description: "Discover and connect with running clubs in your area. Find training partners, join group runs, and become part of the running community.",
  keywords: ["running clubs", "running groups", "marathon training", "jogging", "fitness"],
  openGraph: {
    title: "RunClub Directory",
    description: "Find running clubs and training groups near you",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2025 RunClub Directory. Find your running community.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
