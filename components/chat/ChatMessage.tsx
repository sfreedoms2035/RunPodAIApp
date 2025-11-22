"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, Bot, Code } from "lucide-react";
import { useState } from "react";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
    raw?: any; // Raw input/output for visualization
}

export function ChatMessage({ role, content, raw }: ChatMessageProps) {
    const [showRaw, setShowRaw] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex gap-4 p-4 rounded-xl mb-4 max-w-3xl",
                role === "user" ? "ml-auto bg-primary/10 flex-row-reverse" : "bg-white/5"
            )}
        >
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                role === "user" ? "bg-primary text-primary-foreground" : "bg-white/10 text-white"
            )}>
                {role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="prose prose-invert max-w-none text-sm">
                    <p className="whitespace-pre-wrap">{content}</p>
                </div>

                {raw && (
                    <div className="mt-2">
                        <button
                            onClick={() => setShowRaw(!showRaw)}
                            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Code size={12} />
                            {showRaw ? "Hide Raw Data" : "Show Raw Data"}
                        </button>
                        {showRaw && (
                            <motion.pre
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="mt-2 p-2 bg-black/50 rounded-md text-[10px] font-mono overflow-x-auto border border-white/10"
                            >
                                {JSON.stringify(raw, null, 2)}
                            </motion.pre>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
