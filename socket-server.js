'use strict';

import socketIO from 'socket.io';
import { EditorSocketIOServer } from 'ot.d.ts';
var roomList = {};
var Task=require('./models/task');
mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  var db = mongoUtil.getDb();
  var cl2=db.collection( 'Task' );
console.log("was here")
export default function(server) {
  var str = 'This is a Markdown heading \n\n' +
            'var i = i + 1;';

  var io = socketIO(server);
  io.on('connection', function(socket) {
    socket.on('joinRoom', function(data) {
      if (!roomList[data.room]) {
        var socketIOServer = new EditorSocketIOServer(str, [], data.room, function(socket, cb) {
          var self = this;
          cl2.findByIdAndUpdate(data.room, {content: self.document}, function(err) {
            if (err) return cb(false);
            cb(true);
          });

        });
        roomList[data.room] = socketIOServer;
      }
      roomList[data.room].addClient(socket);
      roomList[data.room].setName(socket, data.username);

      socket.room = data.room;
      socket.join(data.room);
    });

    socket.on('chatMessage', function(data) {
      io.to(socket.room).emit('chatMessage', data);
    });

    socket.on('disconnect', function() {
      socket.leave(socket.room);
    });
  })
}
});