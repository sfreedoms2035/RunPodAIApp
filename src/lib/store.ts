import { create } from 'zustand';

export type ModelType = 'text' | 'image' | 'video' | 'audio';
export type InferenceEngine = 'vllm' | 'transformers';

interface AppState {
  // Connection
  isConnected: boolean;
  isConnecting: boolean;
  connect: (config: any) => Promise<void>;
  disconnect: () => void;

  // Configuration
  modelRepo: string;
  modelType: ModelType;
  inferenceEngine: InferenceEngine;
  setModelRepo: (repo: string) => void;
  setModelType: (type: ModelType) => void;
  setInferenceEngine: (engine: InferenceEngine) => void;

  // Chat
  messages: any[];
  addMessage: (msg: any) => void;
  clearMessages: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isConnected: false,
  isConnecting: false,
  connect: async (config) => {
    set({ isConnecting: true });
    // Simulate connection delay for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ isConnected: true, isConnecting: false });
  },
  disconnect: () => set({ isConnected: false }),

  modelRepo: 'meta-llama/Llama-2-7b-chat-hf',
  modelType: 'text',
  inferenceEngine: 'vllm',
  setModelRepo: (repo) => set({ modelRepo: repo }),
  setModelType: (type) => set({ modelType: type }),
  setInferenceEngine: (engine) => set({ inferenceEngine: engine }),

  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
