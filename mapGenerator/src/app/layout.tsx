import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Sitemap Crawler",
    description: "Simple sitemap crawler tool",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="fa">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
