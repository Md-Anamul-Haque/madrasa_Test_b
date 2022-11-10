const app = require("./app");

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('a user connected');
  });

  io.of("/home").on("connection", socket => {
  console.log("someone connected");
});

io.of("/suppliers").on('connection', (socket) => {
  socket.on('hello', async(id) => {
    socket.emit('hello', 'hello back');
  });
});
module.exports={server,io};