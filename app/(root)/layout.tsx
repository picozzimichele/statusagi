import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/header/navbar";
import { SiteHeader } from "@/components/sidebar/side-header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Statistics at the Edge",
    description: "Beautifully designed statistics at the edge",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f9f9f9] dark:bg-black flex flex-col min-h-screen relative`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <SidebarProvider defaultOpen={false}>
                        <AppSidebar />
                        <main className="flex-1 flex flex-col">
                            <Navbar />
                            {children}
                        </main>
                        <Toaster />
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
