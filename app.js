const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000

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

server.listen(PORT, () => {
  console.log('listening on *:', PORT);
});
