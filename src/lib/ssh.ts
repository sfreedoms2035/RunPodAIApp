import { Client, ClientChannel } from 'ssh2';
import { readFileSync } from 'fs';

class SSHManager {
    private client: Client;
    private isConnected: boolean = false;
    private static instance: SSHManager;

    private constructor() {
        this.client = new Client();
    }

    public static getInstance(): SSHManager {
        if (!SSHManager.instance) {
            SSHManager.instance = new SSHManager();
        }
        return SSHManager.instance;
    }

    public async connect(config: any): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.isConnected) {
                this.client.end();
            }

            this.client.on('ready', () => {
                this.isConnected = true;
                resolve();
            }).on('error', (err) => {
                this.isConnected = false;
                reject(err);
            }).connect({
                host: config.host,
                port: parseInt(config.port),
                username: config.username,
                password: config.password,
                // privateKey: config.privateKeyPath ? readFileSync(config.privateKeyPath) : undefined
                // For simplicity, we'll assume password or key content is passed directly for now, 
                // or we can add file reading logic if needed.
            });
        });
    }

    public async exec(command: string): Promise<string> {
        if (!this.isConnected) throw new Error("Not connected");

        return new Promise((resolve, reject) => {
            this.client.exec(command, (err, stream) => {
                if (err) return reject(err);

                let output = '';
                let error = '';

                stream.on('close', (code: number, signal: any) => {
                    if (code !== 0) {
                        reject(new Error(`Command failed with code ${code}: ${error}`));
                    } else {
                        resolve(output);
                    }
                }).on('data', (data: any) => {
                    output += data;
                }).stderr.on('data', (data: any) => {
                    error += data;
                });
            });
        });
    }

    public disconnect() {
        if (this.isConnected) {
            this.client.end();
            this.isConnected = false;
        }
    }

    public getStatus() {
        return this.isConnected;
    }
}

export const sshManager = SSHManager.getInstance();
