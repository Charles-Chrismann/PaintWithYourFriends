const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const User = require('./models/User');
const Room = require('./models/Room');
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000
let users = []
let rooms = []

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/static'))
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

app.get('/static/:filePath', (req, res) => {
  console.log(req.params.filePath)
  res.sendFile(__dirname + `/static/${req.params.filePath}`);
});

app.post('/user/create', (req, res) => {
  let user = new User(req.body.username)
  users.push(user)
  console.log(users)
  res.send({
    uuid: user.id
  })
})

let a = 0
io.on('connection', (socket) => {
  console.log(a)
  a++
  if(a < 3) {
    socket.join('room a')
    console.log('join room a')
  }
  
    socket.on('draw', (msg) => {
      io.to('room a').emit('draw', msg)
      // io.emit('draw', msg);
      console.log(msg)
    });
  });

server.listen(PORT, () => {
  console.log('listening on *:', PORT);
});
