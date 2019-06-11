/* eslint-disable no-console */
/**
 * Socket.io configuration
 */

// #socket_connect;

import {
  register,
} from '../api/Order/socket';

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  console.log('Onconnect function in socket.io executed');
  socket.on('info', (data) => {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  register(socket);
}

// console.log('register function from order is :', register);

export function io(client) {
  client.on('connection', (socket) => {
    socket.on('subscribeToTimer', (interval) => {
      console.log('socket is subscribing to timer with interval ', interval);
      setInterval(() => {
        socket.emit('timer', new Date());
      }, interval);
    });
    socket.on('add_data', (data) => {
      console.log('socket is subscribing to add_data event ', data);
      socket.broadcast.emit('get_add_data', data);
      socket.emit('get_add_data', data);
    });
    socket.on('update_data', (data) => {
      console.log('socket is subscribing to update_data event ', data);
      socket.broadcast.emit('get_update_data', data);
      socket.emit('get_update_data', data);
    });
    socket.on('delete_data', (data) => {
      console.log('socket is subscribing to delete_data event ', data);
      socket.broadcast.emit('get_delete_data', data);
      socket.emit('get_delete_data', data);
    });

      // disconnect is fired when a socket leaves the server
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

      // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
}

