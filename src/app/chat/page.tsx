"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { Send, Image as ImageIcon, Mic, Bot } from "lucide-react";

export default function ChatPage() {
    const { messages, addMessage, isConnected } = useAppStore();
    const [input, setInput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isGenerating) return;

        // Add user message
        addMessage({ role: "user", content: input, raw: { prompt: input, temperature: 0.7 } });
        setInput("");
        setIsGenerating(true);

        // Simulate generation
        setTimeout(() => {
            addMessage({
                role: "assistant",
                content: "This is a simulated response from the AI model running on RunPod. In a real scenario, this would be streamed from the backend.",
                raw: {
                    token_count: 24,
                    latency: "120ms",
                    model: "llama-2-7b"
                }
            });
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex-1 overflow-y-auto pr-4 mb-4 space-y-4" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                        <Bot size={48} className="mb-4" />
                        <p>Start a conversation with your model</p>
                    </div>
                )}
                {messages.map((msg, i) => (
                    <ChatMessage key={i} {...msg} />
                ))}
                {isGenerating && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm ml-12">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150" />
                    </div>
                )}
            </div>

            <div className="relative">
                <form onSubmit={handleSend} className="relative flex items-center gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 text-muted-foreground hover:text-foreground"
                    >
                        <ImageIcon size={20} />
                    </Button>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isConnected ? "Type a message..." : "Connect to RunPod to chat"}
                        className="pl-12 pr-12 bg-white/5 border-white/10 h-12 rounded-xl"
                        disabled={!isConnected || isGenerating}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute right-2 h-8 w-8 bg-primary hover:bg-primary/90 rounded-lg"
                        disabled={!isConnected || isGenerating || !input.trim()}
                    >
                        <Send size={16} />
                    </Button>
                </form>
            </div>
        </div>
    );
}
