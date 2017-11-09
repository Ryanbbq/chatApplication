var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

var i = 0;

io.on('connection', function(socket) {
  
  console.log('a user connected');
  i++;
  console.log('Users connected:' + i);
  
  socket.on('chat message', function(data) {
    console.log('message: ' + data.message);
    console.log('name: ' + data.name);
    io.emit('chat message', data);
  });
    
  socket.on('disconnect', function() {
    console.log('the user disconnected');
    i--;
    console.log('Users connected : ' + i);
  });
    
  socket.on('users connected', function() {
    io.emit('users connected', i);
  });
});

http.listen(process.env.PORT || 5000, function() {
  console.log('http://chat-application-ryanlb22.c9users.io:8080/');
  console.log("Server started");
});