# RunPod AI App - Build & Run Guide

## Overview
This application allows you to interact with AI models hosted on RunPod via a modern web interface. It supports text, image, and video models, and allows for code customization.

## Prerequisites
-   **Node.js** (v18 or later)
-   **RunPod Account** with an active GPU Pod
-   **SSH Access** to your RunPod instance

## 1. Installation

1.  Clone the repository (if you haven't already):
    ```bash
    git clone https://github.com/sfreedoms2035/RunPodAIApp.git
    cd RunPodAIApp
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## 2. RunPod Configuration

Before running the app, ensure your RunPod instance is ready.

1.  **Start a Pod**: Use a template like `RunPod PyTorch 2.0` or `vLLM`.
2.  **SSH Setup**:
    -   Go to your Pod dashboard.
    -   Click **Connect**.
    -   Copy the SSH command (e.g., `ssh root@123.45.67.89 -p 12345`).
    -   Note the **Host** (`123.45.67.89`), **Port** (`12345`), and **User** (`root`).
    -   If you use a password, note it down. If you use an SSH key, ensure the path is accessible.

## 3. Running the App

1.  Start the development server:
    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## 4. Connecting to RunPod

1.  On the **Dashboard** (Home page), enter your SSH credentials:
    -   **Host IP**: The IP address of your pod.
    -   **Port**: The mapped SSH port (usually not 22, check your pod details).
    -   **Username**: Usually `root`.
    -   **Password**: Your pod password (or leave blank if using key agent, though this app currently requires password or key path configuration in code).

2.  Click **Connect**. You should see the status change to "Connected".

## 5. Deploying a Model

1.  Go to the **Configuration** page.
2.  Enter the **HuggingFace Repo ID** (e.g., `meta-llama/Llama-2-7b-chat-hf`).
3.  Select the **Model Type** and **Inference Engine**.
4.  Click **Deploy**. This will trigger the download and setup process on the remote pod.

## 6. Chatting & Customizing

-   Use the **Chat** page to interact with the model.
-   Use the **Code Editor** to modify `inference.py` on the server for custom logic.

## Troubleshooting

-   **Connection Failed**: Check your internet connection and ensure the Pod is running. Verify SSH credentials by trying to SSH from your terminal first.
-   **Deployment Stuck**: Check the logs in the Configuration page. Ensure the Pod has enough disk space.
