const socket = io();
const gameCanvas = document.querySelector("#game canvas");
const canvasBoundings = gameCanvas.getBoundingClientRect();

gameCanvas.addEventListener('mousemove', (e) => {
    console.log((e.x - canvasBoundings.x) + ", " + (e.y - canvasBoundings.y));
});

socket.on('connected', () => {
    console.log(socket);
    console.log(socket.connected);
});
socket.emit('svSetState', 'host');
socket.emit('svSocketTest', socket.id);
console.log("Ending message");
