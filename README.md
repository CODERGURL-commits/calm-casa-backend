# CalmCasa Backend Engine

This repository runs the real-time websocket engine fueling **CalmCasa**. It handles instant full-mesh event broadcasting, manages real-time presence counts, and pairs client-side hooks without relying on continuous heavy database reads.

Built using **Node.js**, **Express**, and **Socket.io**.

---

##  Key Orchestrations
* **Dynamic WebSocket Gateways:** Manages real-time events (`connection`, `join_casa`, `send_message`, `disconnect`).
* **Stateful Presence Tracking:** Keeps memory records of currently connected sockets, indexing custom user nicknames and avatars across active endpoints.
* **Flexible CORS Configuration:** Built with adaptive regex filtering to smoothly support development local testing and live production subdomains under `vercel.app`.
* **Production Port Adaptability:** Automatically shifts bindings between environment-assigned ports (`process.env.PORT`) or fallback channels (`3001`).

---

##  Core Dependencies

| Package | Purpose |
| :--- | :--- |
| `express` | Minimalist web framework for Node.js routing and server creation |
| `socket.io` | Server-side WebSocket implementation for real-time bidirectional event networks |
| `cors` | Connect/Express middleware to safely manage Cross-Origin Resource Sharing |
| `nodemon` (Dev) | Monitor file updates and automatically restart the local engine during coding |

---

##  Local Installation & Setup

### 1. Install Dependencies
Open your command line interface within your backend folder and initialize your node modules:
```bash
npm install
