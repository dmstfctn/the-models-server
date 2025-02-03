import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	path: '/themodels',
  connectionStateRecovery: {},
  cors: {
    origin: [
      "http://localhost:3000",
      "http://themodels.org",
      "https://themodels.org",
      "https://unrivaled-daifuku-c3c7f0.netlify.app"
    ]
  }
});

server.listen(5040, () => {
  console.log('listening on *:5040');
});

export default io;