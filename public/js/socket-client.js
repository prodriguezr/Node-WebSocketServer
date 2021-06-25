// HTML Refs
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend    = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
    //console.log('Connected');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
    btnSend.style.display = '';
});

socket.on('disconnect', () => {
    //console.log('Disconnected');
    
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
    btnSend.style.display = 'none';
});

socket.on('send-msg', (payload) => {
    console.log(payload);
});

btnSend.addEventListener('click', () => {
    const msg = txtMessage.value;

    const payload = {
        msg,
        id: socket.id,
        time: new Date().getTime(), 
    }

    socket.emit('send-msg', payload, (id) => {
        console.log('From server', id);
    });

    txtMessage.value = '';
});