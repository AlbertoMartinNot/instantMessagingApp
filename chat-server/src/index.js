const express = require("express");
const app = express();

const http = require("http");
const server = http.Server(app);

const socketIO = require("socket.io");
const io = socketIO(server);

const port = process.env.port || 3000;

io.on("connection", (socket) => {
  socket.on('new-message', (message)=>{
      console.log(message);
      io.emit('new-message',message);
  })
  socket.on('disconnect', () => {
    io.emit('user disconnected');
  });
  socket.on('new-user', (user)=>{
    console.log('User connected: ' + user);
    io.emit('new-user',user);
})
});

server.listen(port, () => {
  console.log(`Chat server started on port : ${port}`);
});

