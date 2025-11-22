"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore, ModelType, InferenceEngine } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Settings2, Box } from "lucide-react";

export default function ConfigPage() {
    const {
        modelRepo, setModelRepo,
        modelType, setModelType,
        inferenceEngine, setInferenceEngine,
        isConnected
    } = useAppStore();

    const [isDeploying, setIsDeploying] = useState(false);

    const handleDeploy = async () => {
        setIsDeploying(true);
        // Simulate deployment
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsDeploying(false);
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold mb-2">Model Configuration</h1>
                <p className="text-muted-foreground">Configure and deploy your AI model on RunPod.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="glass-card border-white/10 h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings2 className="w-5 h-5 text-primary" />
                                Deployment Settings
                            </CardTitle>
                            <CardDescription>
                                Specify the model details and inference backend.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>HuggingFace Repository</Label>
                                <Input
                                    value={modelRepo}
                                    onChange={(e) => setModelRepo(e.target.value)}
                                    placeholder="organization/model-name"
                                    className="bg-white/5 border-white/10"
                                />
                                <p className="text-xs text-muted-foreground">
                                    The full path to the model on HuggingFace Hub.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Model Type</Label>
                                <Select
                                    value={modelType}
                                    onValueChange={(v) => setModelType(v as ModelType)}
                                >
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text">Text Generation (LLM)</SelectItem>
                                        <SelectItem value="image">Image Generation (Diffusion)</SelectItem>
                                        <SelectItem value="video">Video Generation</SelectItem>
                                        <SelectItem value="audio">Audio Generation</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Inference Engine</Label>
                                <Select
                                    value={inferenceEngine}
                                    onValueChange={(v) => setInferenceEngine(v as InferenceEngine)}
                                >
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                        <SelectValue placeholder="Select engine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="vllm">vLLM (Recommended for LLMs)</SelectItem>
                                        <SelectItem value="transformers">Standard Transformers</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                className="w-full"
                                onClick={handleDeploy}
                                disabled={!isConnected || isDeploying}
                            >
                                {isDeploying ? (
                                    <span className="flex items-center gap-2">
                                        <Rocket className="animate-spin h-4 w-4" /> Deploying...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Rocket className="h-4 w-4" /> Deploy Model
                                    </span>
                                )}
                            </Button>
                            {!isConnected && (
                                <p className="text-xs text-red-400 text-center">
                                    Please connect to RunPod first.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="glass-card border-white/10 h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Box className="w-5 h-5 text-primary" />
                                Current Deployment
                            </CardTitle>
                            <CardDescription>
                                Status of the currently running model.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg bg-black/40 p-4 font-mono text-sm space-y-2 border border-white/10">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status:</span>
                                    <span className="text-green-400">Active</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Model:</span>
                                    <span className="text-foreground truncate max-w-[200px]">{modelRepo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Engine:</span>
                                    <span className="text-foreground uppercase">{inferenceEngine}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">VRAM:</span>
                                    <span className="text-foreground">14.2 GB</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 mt-4">
                                    <p className="text-xs text-muted-foreground mb-2">Logs</p>
                                    <div className="h-32 overflow-y-auto text-xs text-gray-400 space-y-1">
                                        <p>[INFO] Loading model weights...</p>
                                        <p>[INFO] Model loaded successfully.</p>
                                        <p>[INFO] Starting vLLM engine...</p>
                                        <p>[INFO] Server ready at port 8000.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
