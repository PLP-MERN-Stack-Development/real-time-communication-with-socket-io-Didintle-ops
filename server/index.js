// server/index.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';


dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
cors: {
origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
methods: ['GET', 'POST']
}
});


app.use(cors());
app.use(express.json());


// Simple storage for demo — in real app use DB
const users = new Map();
const messages = []; // {id, room, from, to, text, ts, reactions, readBy, type, file}


// File upload (for images/files) — stored on disk for demo
const uploadDir = path.resolve('./uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, uploadDir),
filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {
const url = `/uploads/${path.basename(req.file.path)}`;
res.json({ url, name: req.file.originalname, size: req.file.size });
});


app.use('/uploads', express.static(uploadDir));


// Basic API to fetch paginated messages
app.get('/messages', (req, res) => {
const { room = 'global', before } = req.query;
const pageSize = 20;
let roomMsgs = messages.filter(m => m.room === room);
if (before) roomMsgs = roomMsgs.filter(m => m.ts < Number(before));
roomMsgs = roomMsgs.sort((a,b)=>b.ts-a.ts).slice(0, pageSize);
res.json(roomMsgs);
});


// Helper: broadcast online list
function broadcastUsers() {
const list = Array.from(users.values()).map(u => ({ id: u.id, name: u.name, online: u.online, socketId: u.socketId }));
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
