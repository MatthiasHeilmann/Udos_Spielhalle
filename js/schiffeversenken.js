const gameCanvas = document.querySelector("#game canvas");

gameCanvas.addEventListener('mousmove', (e) => {
    console.log(e.x + ", " + e.y);
})