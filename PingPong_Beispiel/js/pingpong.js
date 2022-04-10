// to pause the game
playing = true;
// bats
yPosLeftBat = yPosRightBat = 40;
batDistanceToBorder = 40;
batWidth = 10;
batHeight = 100;
// ball
xPosBall = yPosBall = 50;
ballWidth = 10;
xSpeed = ySpeed = 10;
score1 = score2 = 0;
aiSpeed = 6;
// game
goal = 5;
gametimeS = gametimeM = 0;
lastPoint = 0;
pausethick = 20;
pauseheight = 100;


window.onload = ()=> {
c = document.getElementById('gameCanvas');
cc = c.getContext('2d');
cc.font = '20px Arial';
setInterval(update, 1000/30);

// Increase Gametime every Second
setInterval(function(){
    if(playing){
        gametimeS++;
        lastPoint++;
        if(gametimeS == 60){
            gametimeM++;
            gametimeS = 0;
        }
        if(gametimeM==0){
            document.getElementById("gametime").innerHTML="Spielzeit: "+gametimeS+"s";
        }else{
            document.getElementById("gametime").innerHTML="Spielzeit: "+gametimeM+"m "+gametimeS+"s";
        }
    }
},1000);

c.addEventListener('mousemove', (e)=> {
    yPosLeftBat = e.clientY-batHeight/2;
});
}

// Game pause
document.body.onkeyup = function(e){
    if(e.key == " " || e.code == "Space" || e.keycode == 32){pause();};
};
function pause(){
    if(playing){
        playing = false;
        document.getElementById("pause").textContent="Weiter";
        cc.fillStyle='white';
        cc.fillRect(c.width/2-pausethick, c.height/2-pauseheight/2, pausethick, pauseheight);
        cc.fillRect(c.width/2+pausethick, c.height/2-pauseheight/2, pausethick, pauseheight);
    }else{
        playing = true;
        document.getElementById("pause").textContent="Pause";
    }
}

function winner(i){
    pause();
    if(i==1){
        alert("You won! "+score1+":"+score2);
    }else{
        alert("You lost! "+score1+":"+score2);
    }
    score1 = score2 = 0;
    pause();
    reset();
}

function reset() {
xPosBall = c.width/2;
yPosBallx = c.height/2;
xSpeed = -xSpeed;
ySpeed = 3;
lastPoint = 0;
}

function update() {
    // If paused, dont update
    if(playing){
        xPosBall += xSpeed;
        yPosBall += ySpeed;
        if (yPosBall < 0 && ySpeed < 0) {
            ySpeed = -ySpeed;
        }
        if (yPosBall > c.height && ySpeed > 0) {
            ySpeed = -ySpeed;
        }
        // Where the game has to check, if the Ball hits the Bat
        ballHitsBat=batDistanceToBorder+batWidth;
        // Goal left side
        if (xPosBall < 0) {
                score2++;
                reset();
        }
        // Ball hits left Bat
        if (xPosBall==ballHitsBat){
            if(yPosBall > yPosLeftBat && yPosBall < yPosLeftBat + batHeight){
                xSpeed = -xSpeed;
                deltaY = yPosBall - (yPosLeftBat + batHeight/2);
                ySpeed = deltaY*0.3;
            }
        }
        // Goal right side
        if (xPosBall > c.width) {
                score1++;
                reset();
        }
        // Ball hits right Bat
        if(xPosBall==c.width-ballHitsBat){
            if (yPosBall > yPosRightBat && yPosBall < yPosRightBat + batHeight) {
                xSpeed = -xSpeed;
                deltaY = yPosBall - (yPosRightBat + batHeight/2);
                ySpeed = deltaY*0.3;
            }
        }
        // AI movement
        if (yPosRightBat+batHeight/2 < yPosBall || yPosRightBat+batHeight/2 < yPosBall+10) {
            yPosRightBat += aiSpeed;
        }
        if (yPosRightBat+batHeight/2 > yPosBall || yPosRightBat+batHeight/2 > yPosBall-10) {
            yPosRightBat -= aiSpeed;
        }
        cc.font = "30px Arial";
        // Background
        cc.fillStyle = 'black';
        cc.fillRect(0, 0, c.width, c.height);
        // Ball
        cc.fillStyle = 'grey';
        cc.fillRect(xPosBall-ballWidth/2, yPosBall-ballWidth/2, ballWidth, ballWidth);
        // Paddle 1
        cc.fillRect(batDistanceToBorder, yPosLeftBat, batWidth, batHeight);
        // Score 1
        cc.fillText(score1, 100, 50);
        // Paddle 2
        cc.fillRect(c.width-batWidth-batDistanceToBorder, yPosRightBat, batWidth, batHeight);
        // Score 2
        cc.fillText(score2, c.width-100, 50);
        if(score1==goal){
            winner(1);
        }else if(score2==goal){
            winner(2);
        }
    }
}