const socketController = (socket) => {
    console.log('Client connected', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });

    socket.on('send-msg', (payload, callback) => {
        const id = 123456789;
        
        callback(id);

        socket.broadcast.emit('send-msg', payload);
    });
}

module.exports = {
    socketController,
}