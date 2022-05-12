// TODO: Fix Bug: wenn 10 flags gesetzt sind, kann man die flags nicht mehr entfernen

const grid = document.querySelector(".grid")
let width = 10
let mines = 10
let squares = []
let isGameOver = false
let flags = 0

// erzeuge Spielfeld
function createBoard() {

   // erzeuge Array zum Verteilen der Minen
   const minesArray = Array(mines).fill("mine")                        // erzeuge Array[mines] mit Bomben
   const emptyArray = Array(width * width - mines).fill("leer")        // erzeuge Array[width*width-mines] ohne Bomben
   const gameArray = emptyArray.concat(minesArray)                     // verbinde beide Arrays
   shuffleArray(gameArray)
   const shuffledArray = gameArray

   // erzeuge einzelne Felder
   for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div")                      // erzeuge div für jedes Feld
      square.setAttribute("id", i);                                     // gebe div eine ID (hier 0-99)
      square.classList.add(shuffledArray[i])                            // gebe div eine Klasse ("mine" oder "leer")
      grid.appendChild(square)                                          // div-Elemente werden an grid angehängt 
      squares.push(square)                                              // erweitere squares-Array um neues square

      // Linksklick
      square.addEventListener('click', function (e) {
         click(square)
      })

      // Rechtsklick
      square.addEventListener('contextmenu', function (e) {
         e.preventDefault()                                             // verhindert, dass sich nach RK Menü öffnet
         addFlag(square)
      })


      // Rechtsklick Alternative
      // square.oncontextmenu = function(e) {
      //    e.preventDefault()
      //    addFlag(square)
      // }

      // zur Kontrolle -> Nummern in Feld
      // square.innerHTML = i;
   }

   // Zähle Anzahl Minennachbarn
   for (let i = 0; i < squares.length; i++) {
      let total = 0                                                   // total = Anzahl an umliegenden Minen
      const isLeftEdge = (i % width === 0)                            // i%10 = 0 ? -> Feld ist ganz links
      const isRightEdge = (i % width === width - 1)                   // i%10 = 9 ? -> Feld ist ganz rechts

      // wenn Feld leer -> überprüfe Nachbarn -> wenn mine -> total++
      if (squares[i].classList.contains("leer")) {
         if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("mine")) total++             // links
         if (i < 99 && !isRightEdge && squares[i + 1].classList.contains("mine")) total++           // rechts
         if (i > 9 && squares[i - width].classList.contains("mine")) total++                        // oben
         if (i < 90 && squares[i + width].classList.contains("mine")) total++                       // unten
         if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains("mine")) total++    // oben-rechts
         if (i > 10 && !isLeftEdge && squares[i - 1 - width].classList.contains("mine")) total++    // oben-links
         if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains("mine")) total++    // unten-links
         if (i < 89 && !isRightEdge && squares[i + 1 + width].classList.contains("mine")) total++   // unten-rechts

         //Check in Konsole (optional)
         squares[i].setAttribute("anzahl_minen", total)
         console.log(squares[i])
      }
   }

   // vertausche Array-Elemente
   function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = array[i];
         array[i] = array[j];
         array[j] = temp;
      }
   }
}

createBoard()


// Setze Flagge in Feld via Rechtsklick
function addFlag(square) {
   if (isGameOver) return
   if (!square.classList.contains("flag")) {                               // wenn Feld noch keine Flag
   if (!square.classList.contains("checked") && (flags < mines)) {            // wenn Feld noch nicht aufgedeckt und flagcount < minecount
         square.classList.add("flag")
         square.innerHTML = "🚩"
         flags ++
         checkForWin()
      } 
   } else {
      square.classList.remove("flag")
      square.innerHTML = ""
      flags--
   }
}



//Linksklick auf Feld
function click(square) {
   let currentId = square.id
   if (isGameOver) return
   if (square.classList.contains("checked") || square.classList.contains("flag")) return
   if (square.classList.contains("mine")) {
      gameOver(square)
   } else {
      let total = square.getAttribute("anzahl_minen")
      if (total != 0) {
         square.classList.add("checked")
         square.innerHTML = total
         checkForWinnn()
         return
      }
      checkSquare(square, currentId)
   }
   square.classList.add("checked")
   checkForWinnn()                     // FIX
}

// überprüfe Nachbarfelder, wenn angeklicktes Feld keine Mine
function checkSquare(square, currentId) {
   const isLeftEdge = (currentId % width === 0)
   const isRightEdge = (currentId % width === width - 1)

   setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
         const newId = squares[parseInt(currentId) - 1].id
         const newSquare = document.getElementById(newId)
         click(newSquare)
      }
      if (currentId > 9 && !isRightEdge) {
         const newId = squares[parseInt(currentId) + 1 -width].id
         const newSquare = document.getElementById(newId)
         click(newSquare)
      }
      if (currentId > 10) {
         const newId = squares[parseInt(currentId) - width].id
         const newSquare = document.getElementById(newId)
         click(newSquare)
      }
      if (currentId > 11 && !isLeftEdge) {
         const newId = squares[parseInt(currentId) - 1 - width].id
         const newSquare = document.getElementById(newId)
         click(newSquare)
      }
      if (currentId < 98 && !isRightEdge) {
         const newId = squares[parseInt(currentId) + 1].id
         const newSquare = document.getElementById(newId)
         click(newSquare)
      }
      if (currentId < 90 && !isLeftEdge) {
         const newId = squares[parseInt(currentId) - 1 + width].id
         const newSquare = document.getElementById(newId)
         click(newSquare)
      }
      if (currentId < 88 && !isRightEdge) {
         const newId = squares[parseInt(currentId) + 1 + width].id
         const newSquare = document.getElementById(newId)
         click(newSquare)
      }
      if (currentId < 89) {
         const newId = squares[parseInt(currentId)+ width].id
         const newSquare = document.getElementById(newId)
         click(newSquare)
      }

   }, 10)
}


//check verloren
function gameOver(square) {
   alert("Game over!")
   isGameOver = true

   //show all bomb location
   squares.forEach(square => {
      if (square.classList.contains("mine")) {
         square.innerHTML = "💣"
      }
   })
}

//check gewonnen mit flags
function checkForWin() {
   let matches = 0
   for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains("flag") && squares[i].classList.contains("mine")) {
         matches ++
      }
      if (matches === mines) {
         alert("Gewonnen!")
         isGameOver = true
      }
   }
}


// check gewonnen mit aufgedeckten Feldern
function checkForWinnn() {
   let checks = 0
   for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains("checked")) {
         checks++
      }
   }
   if (checks == (width*width - mines)) {
      alert("Gewonnen!")
      isGameOver = true
   }
   console.log(checks + "," + (width*width - mines))
}

//reset