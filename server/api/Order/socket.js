/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/**
    * Order Broadcast updates to client when the model changes
*/

import Order from './model';

function onSave(socket, doc, cb) {
    socket.emit('order:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('order:remove', doc);
}

function register(socket) {
    console.log('Order imported in socket is :', 
    Order.schema.post);
    console.log('Register function inside Order API Model has been executed');
    Order.schema.post('save', (doc) =>
        onSave(socket, doc)
    );
    Order.schema.post('remove', (doc) =>
        onRemove(socket, doc)
    );
}


export { register };