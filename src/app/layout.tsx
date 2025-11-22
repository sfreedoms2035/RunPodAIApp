import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "RunPod AI App",
    description: "High-performance AI Model Serving Interface",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={cn(inter.className, "bg-background min-h-screen overflow-hidden")}>
                <Sidebar />
                <main className="pl-64 h-screen overflow-y-auto relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
                    <div className="relative z-10 p-8 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
