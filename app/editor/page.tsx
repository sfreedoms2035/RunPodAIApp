"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, RefreshCw, FileCode } from "lucide-react";

const DEFAULT_CODE = `import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

class InferenceHandler:
    def __init__(self, model_path):
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForCausalLM.from_pretrained(
            model_path, 
            device_map="auto", 
            torch_dtype=torch.float16
        )

    def generate(self, prompt, max_length=512):
        inputs = self.tokenizer(prompt, return_tensors="pt").to("cuda")
        outputs = self.model.generate(**inputs, max_length=max_length)
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
`;

export default function EditorPage() {
    const { isConnected } = useAppStore();
    const [code, setCode] = useState(DEFAULT_CODE);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-1">Inference Code</h1>
                    <p className="text-muted-foreground">Customize the Python code running on your GPU pod.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <RefreshCw size={16} /> Reload
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!isConnected || isSaving}
                        className="gap-2"
                    >
                        {isSaving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                        Save to Pod
                    </Button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex-1"
            >
                <Card className="h-full glass-card border-white/10 flex flex-col overflow-hidden">
                    <CardHeader className="py-3 px-4 border-b border-white/10 bg-white/5 flex flex-row items-center gap-2">
                        <FileCode size={16} className="text-blue-400" />
                        <span className="text-sm font-mono text-muted-foreground">inference.py</span>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage="python"
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                padding: { top: 16 },
                                scrollBeyondLastLine: false,
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            }}
                        />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
