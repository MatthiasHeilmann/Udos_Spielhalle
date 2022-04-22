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
goal = 10;
gametimeS = gametimeM = 0;
lastPoint = 0;
pausethick = 20;
pauseheight = 100;
// fillstyle & streak
fillStyleDefault = 'RGB(204,204,204)'
fillStyleLeft = fillStyleDefault;
fillStyleRight = fillStyleDefault;
streak = 0; // 
streakGoal = 3;
// colors for winstreak
streakRed = 255;
streakGreen = 0;
streakBlue = 0;

window.onload = ()=> {
    // get the canvas from the iframe
    var iframe = document.getElementById('iframe_pingpong_game');
    var iframeDocument = iframe.contentDocument;
    if(!iframeDocument){throw "iframe couldn't be found in DOM.";}
    c = iframeDocument.getElementById('gameCanvas');
    // ******************************* //
    cc = c.getContext('2d');
    cc.font = '20px Arial';
    // Click on the game to pause it
    c.addEventListener("click",pause);
    // Update 30 times per second
    setInterval(update, 1000/30);
    // Increase Gametime every Second
    setInterval(()=>{
        if(playing){
            // count gametime with minutes&&seconds
            gametimeS++;
            lastPoint++;
            if(gametimeS == 60){
                gametimeM++;
                gametimeS = 0;
            }
            // display gametime
            if(gametimeM==0){
                document.getElementById("gametime").innerHTML="Spielzeit: "+gametimeS+"s";
            }else{
                document.getElementById("gametime").innerHTML="Spielzeit: "+gametimeM+"m "+gametimeS+"s";
            }
        }
    },1000);
    // Mousemovement as Left paddle position
    c.addEventListener('mousemove', (e)=> {
        yPosLeftBat = e.clientY-batHeight/2;
    });
}

// Game pause
//document.body.onkeyup = function(e){
//    if(e.key == " " || e.code == "Space" || e.keycode == 32){pause();};
//};
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
function newGame(){
    reset();
    playing = true;
    gametimeM = gametimeS = 0;
    score1 = score2 = 0;
    document.getElementById("gametime").innerHTML="Spielzeit: 0s";
}
// colors for the winstreaking side
function getFillStyle(){
    var s=20;
    if (streakRed==255&&streakBlue==0&&streakGreen<255){
        streakGreen+=s;
    }else if(streakGreen==255&&streakBlue==0&&streakRed>0){
        streakRed-=s;
    }else if(streakRed==0&&streakGreen==255&&streakBlue<255){
        streakBlue+=s;
    }else if(streakRed==0&&streakBlue==255&&streakGreen>0){
        streakGreen-=s;
    }else if(streakGreen==0&&streakBlue==255&&streakRed<255){
        streakRed+=s;
    }else if(streakRed==255&&streakGreen==0&&streakBlue>0){
        streakBlue-=s;
    }
    if(streakRed>255){
        streakRed=255;
    }else if(streakRed<0){
        streakRed=0;
    }
    if(streakGreen>255){
        streakGreen=255;
    }else if(streakGreen<0){
        streakGreen=0;
    }
    if(streakBlue>255){
        streakBlue=255;
    }else if(streakBlue<0){
        streakBlue=0;
    }
    var rgb = 'RGB('+streakRed+','+streakGreen+','+streakBlue+')';
    return rgb;
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
        // Goal on the left side (AI)
        if (xPosBall < 0) {
            score2++;
            reset();
            if(streak>0){
                streak = -1;
                fillStyleLeft = fillStyleDefault;
            }else{
                streak--;
            }
        }
        // Ball hits left Bat
        if (xPosBall==ballHitsBat){
            if(yPosBall > yPosLeftBat && yPosBall < yPosLeftBat + batHeight){
                xSpeed = -xSpeed;
                deltaY = yPosBall - (yPosLeftBat + batHeight/2);
                ySpeed = deltaY*0.3;
            }
        }
        // Goal on the right side (PLAYER)
        if (xPosBall > c.width) {
            score1++;
            reset();
            if(streak<0){
                streak = 1;
                fillStyleRight = fillStyleDefault;
            }else{
                streak++;
            }
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

        // **********    STREAK    ********** //
        if(streak>=streakGoal){
            fillStyleLeft = getFillStyle();
        }else if(Math.abs(streak)>=streakGoal){
            fillStyleRight = getFillStyle();
        }
        // ********** DISPLAY GAME ********** //

        cc.font = "40px Arial";
        // Background
        cc.fillStyle = 'black';
        cc.fillRect(0, 0, c.width, c.height);
        // Ball
        cc.fillStyle = fillStyleDefault
        cc.fillRect(xPosBall-ballWidth/2, yPosBall-ballWidth/2, ballWidth, ballWidth);
        // Paddle 1
        cc.fillStyle = fillStyleLeft; 
        // Paddle should not move out of the window
        if(yPosLeftBat+batHeight>c.height){ // Paddle is partly under the window
            cc.fillRect(batDistanceToBorder, c.height-batHeight, batWidth, batHeight);
        }else if(yPosLeftBat<0){ // Paddle is partly above the window
            cc.fillRect(batDistanceToBorder, 0, batWidth, batHeight);
        }else{
            cc.fillRect(batDistanceToBorder, yPosLeftBat, batWidth, batHeight);
        }
        // Score 1
        cc.fillText(score1, 100, 50);
        // Paddle 2
        cc.fillStyle = fillStyleRight;
        // Paddle should not move out of the window
        if(yPosRightBat+batHeight>c.height){ // Paddle is partly under the window
            cc.fillRect(c.width-batWidth-batDistanceToBorder, c.height-batHeight, batWidth, batHeight);
        }else if(yPosRightBat<0){ // Paddle is partly above the window
            cc.fillRect(c.width-batWidth-batDistanceToBorder, 0, batWidth, batHeight);
        }else{
            cc.fillRect(c.width-batWidth-batDistanceToBorder, yPosRightBat, batWidth, batHeight);
        }
        // Score 2
        cc.fillText(score2, c.width-100, 50);
        if(score1==goal){
            winner(1);
        }else if(score2==goal){
            winner(2);
        }
        // ********** ************ ********** //
    }
}