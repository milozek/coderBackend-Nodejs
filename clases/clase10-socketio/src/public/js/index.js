const socket = io()
socket.on('historial', (msgs) => {
    console.log(msgs)
})
