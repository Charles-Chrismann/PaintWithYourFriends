const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const User = require('./models/User');
const Room = require('./models/Room');

const PORT = process.env.PORT || 3000
let users = []
let rooms = []

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/static'))
// app.use(express.static('public'))
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/join', (req, res) => {
  res.sendFile(__dirname + '/static/pages/join.html');
});

app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/static/pages/create.html');
});

app.get('/user', (req, res) => {
  res.sendFile(__dirname + '/static/pages/user.html');
});

app.post('/create', (req, res) => {
  let room = new Room(req.body.roomName)
  rooms.push(room)
  console.log(req.body)
  res.send({
    roomId: room.id
  });
});

app.get('/rooms/:roomId', (req, res) => {
  res.sendFile(__dirname + '/static/pages/room.html');
});

// app.get('/static/:filePath', (req, res) => {
//   console.log( `static file: /static/${req.params.filePath}`)
//   console.log(req.params.filePath)
//   res.sendFile(__dirname + `/static/${req.params.filePath}`);
// });

app.post('/user', (req, res) => {
  let user = new User(req.body.username)
  users.push(user)
  console.log(users)
  res.send({
    uuid: user.id
  })
})

let a = 0
io.on('connection', (socket) => {
  console.log('connect')
  socket.on('join', (msg) => {
    console.log('join', msg.roomId)
    socket.join(msg.roomId);
    io.emit('client join', {
      username: msg.userId
    })
  });
  
    socket.on('draw', (msg) => {
      io.to(msg.roomId).emit('draw', msg);
      // io.emit('draw', msg);
      console.log('draw', msg)
    });
  });

server.listen(PORT, () => {
  console.log('listening on *:', PORT);
});
