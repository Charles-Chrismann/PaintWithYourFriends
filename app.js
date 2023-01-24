
import express from 'express'
import cors from 'cors';
import http from 'http'
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use('/static', express.static(__dirname + '/static'))
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/static/:filePath', (req, res) => {
  console.log(req.params.filePath)
  res.sendFile(__dirname + `/static/${req.params.filePath}`);
});

io.on('connection', (socket) => {
    socket.on('draw', (msg) => {
      io.emit('draw', msg);
      console.log(msg)
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
