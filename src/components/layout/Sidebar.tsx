"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Settings,
    MessageSquare,
    Code,
    Terminal,
    Server
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Settings, label: "Configuration", href: "/config" },
    { icon: MessageSquare, label: "Chat", href: "/chat" },
    { icon: Code, label: "Code Editor", href: "/editor" },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isConnected } = useAppStore();

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 h-screen bg-card border-r border-white/10 flex flex-col p-4 fixed left-0 top-0 z-50"
        >
            <div className="flex items-center gap-3 px-2 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <Server size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-lg tracking-tight">RunPod AI</h1>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500")} />
                        {isConnected ? "Connected" : "Disconnected"}
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-primary/10 rounded-lg"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <item.icon size={20} className="relative z-10" />
                            <span className="font-medium relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-4 border-t border-white/10">
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Terminal size={12} />
                        <span>System Status</span>
                    </div>
                    <div className="text-xs font-mono text-green-400">
                        {isConnected ? "System Operational" : "Waiting for connection..."}
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}
