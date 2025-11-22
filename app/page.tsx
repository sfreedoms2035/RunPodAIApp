"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Shield, Cpu, Activity } from "lucide-react";

export default function Home() {
    const { isConnected, isConnecting, connect } = useAppStore();
    const [host, setHost] = useState("");
    const [port, setPort] = useState("22");
    const [username, setUsername] = useState("root");
    const [password, setPassword] = useState("");

    const handleConnect = async (e: React.FormEvent) => {
        e.preventDefault();
        await connect({ host, port, username, password });
    };

    if (isConnected) {
        return (
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold mb-2">System Dashboard</h1>
                    <p className="text-muted-foreground">Monitor your RunPod instance and AI model status.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glass-card border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">GPU Status</CardTitle>
                            <Cpu className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Active</div>
                            <p className="text-xs text-muted-foreground">NVIDIA A100 80GB</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                            <Activity className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24%</div>
                            <p className="text-xs text-muted-foreground">19.2GB / 80GB</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Model Status</CardTitle>
                            <Shield className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Ready</div>
                            <p className="text-xs text-muted-foreground">vLLM Engine Running</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="glass-card border-white/10">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Connect to RunPod</CardTitle>
                        <CardDescription className="text-center">
                            Enter your pod's SSH credentials to establish a secure connection.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleConnect} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Host IP</label>
                                <Input
                                    placeholder="e.g. 192.168.1.1"
                                    value={host}
                                    onChange={(e) => setHost(e.target.value)}
                                    className="bg-white/5 border-white/10"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Port</label>
                                    <Input
                                        placeholder="22"
                                        value={port}
                                        onChange={(e) => setPort(e.target.value)}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Username</label>
                                    <Input
                                        placeholder="root"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Password / Private Key</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/5 border-white/10"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90"
                                disabled={isConnecting}
                            >
                                {isConnecting ? (
                                    <span className="flex items-center gap-2">
                                        <Activity className="animate-spin h-4 w-4" /> Connecting...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Terminal className="h-4 w-4" /> Connect via SSH
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
