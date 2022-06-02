var besetzt;
var XO;
var zuege;
var Spielmodus=1;
var playing=1;
const FIELD_00="TicTacToe_00";
const FIELD_01="TicTacToe_01";
const FIELD_02="TicTacToe_02";
const FIELD_10="TicTacToe_10";
const FIELD_11="TicTacToe_11";
const FIELD_12="TicTacToe_12";
const FIELD_20="TicTacToe_20";
const FIELD_21="TicTacToe_21";
const FIELD_22="TicTacToe_22";
const WINNER_COLOR="rgb(189,15,22)";
const CELL_COLOR_0="lightgray";
const PLAYER_COLOR_1="rgb(16, 139, 183)";
const PLAYER_COLOR_2="rgb(200,99,18)";
const cb = document.querySelector('#switch1');

window.onload = ()=> {newGame();};
function newGame(){
    XO= [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    besetzt = [
        [false,false,false],
        [false,false,false],
        [false,false,false]
    ];
    zuege=0;
    playing=1;
    boinkStop();
}
function reset(){
    newGame();
    document.getElementById(FIELD_00).style.background=CELL_COLOR_0;
    document.getElementById(FIELD_00).innerHTML="";
    document.getElementById(FIELD_01).style.background=CELL_COLOR_0;
    document.getElementById(FIELD_01).innerHTML="";
    document.getElementById(FIELD_02).style.background=CELL_COLOR_0;
    document.getElementById(FIELD_02).innerHTML="";
    document.getElementById(FIELD_10).style.background=CELL_COLOR_0;
    document.getElementById(FIELD_10).innerHTML="";
    document.getElementById(FIELD_11).style.background=CELL_COLOR_0;
    document.getElementById(FIELD_11).innerHTML="";
    document.getElementById(FIELD_12).style.background=CELL_COLOR_0;
    document.getElementById(FIELD_12).innerHTML="";
    document.getElementById(FIELD_20).style.background=CELL_COLOR_0;
    document.getElementById(FIELD_20).innerHTML="";
    document.getElementById(FIELD_21).style.background=CELL_COLOR_0;
    document.getElementById(FIELD_21).innerHTML="";
    document.getElementById(FIELD_22).style.background=CELL_COLOR_0;
    document.getElementById(FIELD_22).innerHTML="";
    document.getElementById("txt_spielmodus").style.color="black";
    document.getElementById("X_won").style.display="none";
    document.getElementById("X_won").style.visibility="hidden";
    document.getElementById("Udo_won").style.display="none";
    document.getElementById("Udo_won").style.visibility="hidden";
    document.getElementById("O_won").style.display="none";
    document.getElementById("O_won").style.visibility="hidden";
    document.getElementById("unentschieden").style.display="none";
    document.getElementById("unentschieden").style.visibility="hidden";
    // document.getElementById("post_game").style.display="none";
    document.getElementById("post_game").style.visibility="hidden";
}
function switchSpielmodus(){
    if(zuege>0&&zuege<9){
        cb.checked= !cb.checked;
        document.getElementById("txt_spielmodus").style.animation = "forbidden 1s 1";
    }else{
        if(cb.checked){
            Spielmodus=0;
            document.getElementById("txt_spielmodus").innerHTML="Spielmodus: 1v1";
        }else{
            Spielmodus=1;
            document.getElementById("txt_spielmodus").innerHTML="Spielmodus: Gegen Udo";
        }
        if(zuege==9){
            reset();
        }
    }
    // console.log("neuer Spielmodus: "+Spielmodus);
}

function print(){
    for(i=0;i<besetzt.length;i++){
        console.log(XO[i][0]+XO[i][1]+XO[i][2]);
    }
}
function boink(){
    document.getElementById("reset").style.animation = "bounce 1.5s infinite";
}
function boinkStop(){
    document.getElementById("reset").style.animation = "paused";
}

function playerWon(player){
    console.log(player+" won!");
    playing=0;
    if(player=="X"){
        document.getElementById("X_won").style.display="inline";
        document.getElementById("X_won").style.visibility="visible";
        document.getElementById("post_game").style.backgroundColor="rgb(200,99,18)";
    }else if(player=="O"){
        if(Spielmodus==1){
            document.getElementById("Udo_won").style.display="inline";
            document.getElementById("Udo_won").style.visibility="visible";
            document.getElementById("post_game").style.backgroundColor="rgb(189,15,22)";

        }else{
            document.getElementById("O_won").style.display="inline";
            document.getElementById("O_won").style.visibility="visible";
            document.getElementById("post_game").style.backgroundColor="rgb(16, 139, 183)";
        }
    }else{
        document.getElementById("unentschieden").style.display="inline";
        document.getElementById("unentschieden").style.visibility="visible";
        document.getElementById("post_game").style.backgroundColor="rgb(200,118,140)";
    }
    document.getElementById("txt_spielmodus").style.color="black";
    document.getElementById("post_game").style.display="inline";
    document.getElementById("post_game").style.visibility="visible";
    boink();
}

function besetzen(row,col){
    if(playing==1){
        // console.log("besetzen"+row+col);
        if(!besetzt[row][col]){
            if((zuege%2)==0){
                besetzenX(row,col);
            }else{
                if(Spielmodus!=1){
                    besetzenO(row,col);
                }else{
                    console.log("forbidden");
                    document.getElementById("txt_spielmodus").style.animation = "forbidden 1s 1";
                }
            }
            if(Spielmodus==1){
                playing=2;
                setTimeout(botPlay,1000);
                playing=1;
            }
        }
    }
}
function besetzenX(row,col){
    // console.log("besetzenX"+row+col);
    zuege++;
    besetzt[row][col]=true;
    XO[row][col]="X";
    document.getElementById("TicTacToe_"+row+col).innerHTML="X";
    document.getElementById("TicTacToe_"+row+col).style.color=PLAYER_COLOR_2;
    var win;
    win=getGewinner();
        if(win=="X"){
            playerWon("X");
        }
        if(zuege==9&&win!="X"){
            playerWon("unentschieden");
        }
}
function besetzenO(row,col){
    zuege++;
    besetzt[row][col]=true;
    XO[row][col]="O";
    document.getElementById("TicTacToe_"+row+col).innerHTML="O";
    document.getElementById("TicTacToe_"+row+col).style.color=PLAYER_COLOR_1;
    var win;
    win=getGewinner();
        if(win=="O"){
            playerWon("O");
        }
        if(zuege==9&&win!="O"){
            playerWon("unentschieden");
        }
}
  
function getGewinner(){
    if(XO[0][0]=="X" && XO[1][1]=="X" && XO[2][2]=="X"){
        document.getElementById(FIELD_00).style.background=WINNER_COLOR;
        document.getElementById(FIELD_11).style.background=WINNER_COLOR;
        document.getElementById(FIELD_22).style.background=WINNER_COLOR;
        zuege=9;
        return "X";
    }else if(XO[0][0]=="X" && XO[0][1]=="X" && XO[0][2]=="X"){
        document.getElementById(FIELD_00).style.background=WINNER_COLOR;
        document.getElementById(FIELD_01).style.background=WINNER_COLOR;
        document.getElementById(FIELD_02).style.background=WINNER_COLOR;
        zuege=9;
        return "X";
    }else if(XO[0][0]=="X" && XO[1][0]=="X" && XO[2][0]=="X"){
        document.getElementById(FIELD_00).style.background=WINNER_COLOR;
        document.getElementById(FIELD_10).style.background=WINNER_COLOR;
        document.getElementById(FIELD_20).style.background=WINNER_COLOR;
        zuege=9;
        return "X";
    }else if(XO[0][1]=="X" && XO[1][1]=="X" && XO[2][1]=="X"){
        document.getElementById(FIELD_01).style.background=WINNER_COLOR;
        document.getElementById(FIELD_11).style.background=WINNER_COLOR;
        document.getElementById(FIELD_21).style.background=WINNER_COLOR;
        zuege=9;
        return "X";
    }else if(XO[0][2]=="X" && XO[1][2]=="X" && XO[2][2]=="X"){
        document.getElementById(FIELD_02).style.background=WINNER_COLOR;
        document.getElementById(FIELD_12).style.background=WINNER_COLOR;
        document.getElementById(FIELD_22).style.background=WINNER_COLOR;
        zuege=9;
        return "X";
    }else if(XO[0][2]=="X" && XO[1][1]=="X" && XO[2][0]=="X"){
        document.getElementById(FIELD_02).style.background=WINNER_COLOR;
        document.getElementById(FIELD_11).style.background=WINNER_COLOR;
        document.getElementById(FIELD_20).style.background=WINNER_COLOR;
        zuege=9;
        return "X";
    }else if(XO[1][0]=="X" && XO[1][1]=="X" && XO[1][2]=="X"){
        document.getElementById(FIELD_10).style.background=WINNER_COLOR;
        document.getElementById(FIELD_11).style.background=WINNER_COLOR;
        document.getElementById(FIELD_12).style.background=WINNER_COLOR;
        zuege=9;
        return "X";
    }else if(XO[2][0]=="X" && XO[2][1]=="X" && XO[2][2]=="X"){
        document.getElementById(FIELD_20).style.background=WINNER_COLOR;
        document.getElementById(FIELD_21).style.background=WINNER_COLOR;
        document.getElementById(FIELD_22).style.background=WINNER_COLOR;
        zuege=9;
        return "X";
    }
    else if(XO[0][0]=="O" && XO[1][1]=="O" && XO[2][2]=="O"){
        document.getElementById(FIELD_00).style.background=WINNER_COLOR;
        document.getElementById(FIELD_11).style.background=WINNER_COLOR;
        document.getElementById(FIELD_22).style.background=WINNER_COLOR;
        zuege=9;
        return "O";
    }else if(XO[0][0]=="O" && XO[0][1]=="O" && XO[0][2]=="O"){
        document.getElementById(FIELD_00).style.background=WINNER_COLOR;
        document.getElementById(FIELD_01).style.background=WINNER_COLOR;
        document.getElementById(FIELD_02).style.background=WINNER_COLOR;
        zuege=9;
        return "O";
    }else if(XO[0][0]=="O" && XO[1][0]=="O" && XO[2][0]=="O"){
        document.getElementById(FIELD_00).style.background=WINNER_COLOR;
        document.getElementById(FIELD_10).style.background=WINNER_COLOR;
        document.getElementById(FIELD_20).style.background=WINNER_COLOR;
        zuege=9;
        return "O";
    }else if(XO[0][1]=="O" && XO[1][1]=="O" && XO[2][1]=="O"){
        document.getElementById(FIELD_01).style.background=WINNER_COLOR;
        document.getElementById(FIELD_11).style.background=WINNER_COLOR;
        document.getElementById(FIELD_21).style.background=WINNER_COLOR;
        zuege=9;
        return "O";
    }else if(XO[0][2]=="O" && XO[1][2]=="O" && XO[2][2]=="O"){
        document.getElementById(FIELD_02).style.background=WINNER_COLOR;
        document.getElementById(FIELD_12).style.background=WINNER_COLOR;
        document.getElementById(FIELD_22).style.background=WINNER_COLOR;
        zuege=9;
        return "O";
    }else if(XO[0][2]=="O" && XO[1][1]=="O" && XO[2][0]=="O"){
        document.getElementById(FIELD_02).style.background=WINNER_COLOR;
        document.getElementById(FIELD_11).style.background=WINNER_COLOR;
        document.getElementById(FIELD_20).style.background=WINNER_COLOR;
        zuege=9;
        return "O";
    }else if(XO[1][0]=="O" && XO[1][1]=="O" && XO[1][2]=="O"){
        document.getElementById(FIELD_10).style.background=WINNER_COLOR;
        document.getElementById(FIELD_11).style.background=WINNER_COLOR;
        document.getElementById(FIELD_12).style.background=WINNER_COLOR;
        zuege=9;
        return "O";
    }else if(XO[2][0]=="O" && XO[2][1]=="O" && XO[2][2]=="O"){
        document.getElementById(FIELD_20).style.background=WINNER_COLOR;
        document.getElementById(FIELD_21).style.background=WINNER_COLOR;
        document.getElementById(FIELD_22).style.background=WINNER_COLOR;
        zuege=9;
        return "O";
    }else{return "nope";}
    
}

/******************* BOT *******************/
/*******************************************/
// Code aus altem Projekt                  //
// pls dont judge me                       //
/*******************************************/
/******************* BOT *******************/

var bef;
function randombesetzenO(){
    for(i=0;i<besetzt.length;i++){
        for(j=0; j<besetzt[0].length;j++){
            if(!besetzt[i][j]){
                besetzenO(i,j);    
                return;
            }
        }   
    }
}

function botPlay(){
    if(zuege==1){                           //alle 9 Möglichkeiten für den ersten Zug;
        if(besetzt[1][1]){
            besetzenO(2,0);
            bef=0;
        }else if(besetzt[0][0]){
            besetzenO(1,1);
            bef=1;
        }else if(besetzt[2][0]){
            besetzenO(1,1);
            bef=2;
        }else if(besetzt[2][2]){
            besetzenO(1,1);
            bef=3;
        }else if(besetzt[0][2]){
            besetzenO(1,1);
            bef=4;
        }else if(besetzt[1][0]){
            besetzenO(0,0);
            bef=5;
        }else if(besetzt[0][1]){
            besetzenO(0,2);
            bef=6;
        }else if(besetzt[1][2]){
            besetzenO(2,2);
            bef=7;
        }else if(besetzt[2][1]){
            besetzenO(2,0);
            bef=8;
        }
    }
    if(zuege==3){
        var gefahr= erkenneGefahr();        //wenn Gefahr besteht zu verlieren, dementsprechend handeln;
        switch (gefahr) {
            case 1:besetzenO(2,2);break;
            case 2:besetzenO(2,1);break;
            case 3:besetzenO(2,0);break;
            case 4:besetzenO(1,0);break;
            case 5:besetzenO(0,0);break;
            case 6:besetzenO(0,1);break;
            case 7:besetzenO(0,2);break;
            case 8:besetzenO(1,2);break;
            case 9:besetzenO(2,2);break;
            case 10:besetzenO(1,1);break;
            case 11:besetzenO(0,0);break;
            case 12:besetzenO(0,2);break;
            case 13:besetzenO(2,0);break;
            case 14:besetzenO(1,1);break;
            case 15:besetzenO(0,0);break;
            case 16:besetzenO(2,2);break;
            case 17:besetzenO(2,0);break;
            case 18:besetzenO(0,2);break;
            case 19:besetzenO(1,1);break;
            case 20:besetzenO(1,1);break;
            case 21:besetzenO(0,1);break;
            case 22:besetzenO(2,1);break;
            case 23:besetzenO(1,0);break;
            case 24:besetzenO(1,2);break;
            default:                            //Wenn keine Gefahr besteht zu verlieren, müssen alle Fälle abgedeckt werden und vorrauschauend handeln;
                switch (bef) {
                    case 1:
                        if(besetzt[2][1]){
                            besetzenO(1,2);
                            bef=9;
                        }else if(besetzt[2][2]){
                            besetzenO(1,0);
                            bef=10;
                        }else if(besetzt[1][2]){
                            besetzenO(0,1);
                            bef=11;
                        }
                        break;
                    case 2:
                        if(besetzt[1][2]){
                            besetzenO(0,1);
                            bef=12;
                        }else if(besetzt[0][2]){
                            besetzenO(2,1);
                            bef=13;
                        }else if(besetzt[0][1]){
                            besetzenO(1,0);
                            bef=14;
                        }
                        break;
                    case 3:
                        if(besetzt[0][1]){
                            besetzenO(1,0);
                            bef=15;
                        }else if(besetzt[0][0]){
                            besetzenO(2,1);
                            bef=16;
                        }else if(besetzt[1][0]){
                            besetzenO(2,1);
                            bef=17;
                        }
                        break;
                    case 4:
                        if(besetzt[1][0]){
                            besetzenO(2,1);
                            bef=18;
                        }else if(besetzt[2][0]){
                            besetzenO(0,1);
                            bef=19;
                        }else if(besetzt[2][1]){
                            besetzenO(1,2);
                            bef=20;
                        } 
                        break;
                    case 5:
                        if(besetzt[2][0]){
                            besetzenO(1,1);
                            bef=21;
                        }else if(besetzt[2][1]){
                            besetzenO(0,2);
                            bef=22;
                        }else if(besetzt[2][2]){
                            besetzenO(0,2);
                            bef=23;
                        }else if(besetzt[0][2]){
                            besetzenO(1,1);
                            bef=24;
                        }else if(besetzt[0][1]){
                            besetzenO(1,1);
                            bef=25;
                        }
                        break;
                    case 6:
                        if(besetzt[0][0]){
                            besetzenO(1,1);
                            bef=26;
                        }else if(besetzt[1][0]){
                            besetzenO(2,2);
                            bef=27;
                        }   else if(besetzt[2][0]){
                            besetzenO(2,2);
                            bef=28;
                        }else if(besetzt[2][2]){
                            besetzenO(1,1);
                            bef=29;
                        }else if(besetzt[1][2]){
                            besetzenO(1,1);
                            bef=30;
                        }
                        break;
                    case 7:
                        if(besetzt[0][2]){
                            besetzenO(1,1);
                            bef=31;
                        }else if(besetzt[0][1]){
                            besetzenO(2,0);
                            bef=32;
                        }else if(besetzt[0][0]){
                            besetzenO(2,0);
                            bef=33;
                        }else if(besetzt[2][0]){
                            besetzenO(1,1);
                            bef=34;
                        }else if(besetzt[2][1]){
                            besetzenO(1,1);
                            bef=35;
                        }
                        break;
                    case 8:
                        if(besetzt[2][2]){
                            besetzenO(1,1);
                            bef=36;
                        }else if(besetzt[1][2]){
                            besetzenO(0,0);
                            bef=37;
                        }else if(besetzt[0][2]){
                            besetzenO(0,0);
                            bef=38;
                        }else if(besetzt[0][0]){
                            besetzenO(1,1);
                            bef=39;
                        }else if(besetzt[1][0]){
                            besetzenO(1,1);
                            bef=40;
                        }
                        break;
                    default:randombesetzenO();break;
                }
            break;
        }
    }
    if(zuege==5){
        //Wenn die Möglichkeit besteht zu gewinnen, wird diese ergriffen;
        var gefahr= erkenneGefahr();
        var Win= erkenneWin();
        switch (Win) {
            case 1:besetzenO(2,2);break;
            case 2:besetzenO(2,1);break;
            case 3:besetzenO(2,0);break;
            case 4:besetzenO(1,0);break;
            case 5:besetzenO(0,0);break;
            case 6:besetzenO(0,1);break;
            case 7:besetzenO(0,2);break;
            case 8:besetzenO(1,2);break;
            case 9:besetzenO(2,2);break;
            case 10:besetzenO(1,1);break;
            case 11:besetzenO(0,0);break;
            case 12:besetzenO(0,2);break;
            case 13:besetzenO(2,0);break;
            case 14:besetzenO(1,1);break;
            case 15:besetzenO(0,0);break;
            case 16:besetzenO(2,2);break;
            case 17:besetzenO(2,0);break;
            case 18:besetzenO(0,2);break;
            case 19:besetzenO(1,1);break;
            case 20:besetzenO(1,1);break;
            case 21:besetzenO(0,1);break;
            case 22:besetzenO(2,1);break;
            case 23:besetzenO(1,0);break;
            default:
                switch (gefahr) {
                    case 1:besetzenO(2,2);break;
                    case 2:besetzenO(2,1);break;
                    case 3:besetzenO(2,0);break;
                    case 4:besetzenO(1,0);break;
                    case 5:besetzenO(0,0);break;
                    case 6:besetzenO(0,1);break;
                    case 7:besetzenO(0,2);break;
                    case 8:besetzenO(1,2);break;
                    case 9:besetzenO(2,2);break;
                    case 10:besetzenO(1,1);break;
                    case 11:besetzenO(0,0);break;
                    case 12:besetzenO(0,2);break;
                    case 13:besetzenO(2,0);break;
                    case 14:besetzenO(1,1);break;
                    case 15:besetzenO(0,0);break;
                    case 16:besetzenO(2,2);break;
                    case 17:besetzenO(2,0);break;
                    case 18:besetzenO(0,2);break;
                    case 19:besetzenO(1,1);break;
                    case 20:besetzenO(1,1);break;
                    case 21:besetzenO(0,1);break;
                    case 22:besetzenO(2,1);break;
                    case 23:besetzenO(1,0);break;
                    case 24:besetzenO(1,2);break;
                    default:
                        switch (bef) {
                            case 11:besetzenO(2,0);bef=41;break;
                            case 14:besetzenO(2,2);bef=42;break;
                            case 17:besetzenO(0,2);bef=43;break;
                            case 28:besetzenO(1,1);bef=44;break;
                            case 33:besetzenO(1,1);bef=45;break;
                            case 38:besetzenO(1,1);bef=46;break;
                            default:randombesetzenO();break;}
                    break;
                }
            break;
        }
    }
    if(zuege==7){
        var gefahr= erkenneGefahr();
        var Win= erkenneWin();
        switch (Win) {
            case 1:besetzenO(2,2);break;
            case 2:besetzenO(2,1);break;
            case 3:besetzenO(2,0);break;
            case 4:besetzenO(1,0);break;
            case 5:besetzenO(0,0);break;
            case 6:besetzenO(0,1);break;
            case 7:besetzenO(0,2);break;
            case 8:besetzenO(1,2);break;
            case 9:besetzenO(2,2);break;
            case 10:besetzenO(1,1);break;
            case 11:besetzenO(0,0);break;
            case 12:besetzenO(0,2);break;
            case 13:besetzenO(2,0);break;
            case 14:besetzenO(1,1);break;
            case 15:besetzenO(0,0);break;
            case 16:besetzenO(2,2);break;
            case 17:besetzenO(2,0);break;
            case 18:besetzenO(0,2);break;
            case 19:besetzenO(1,1);break;
            case 20:besetzenO(1,1);break;
            case 21:besetzenO(0,1);break;
            case 22:besetzenO(2,1);break;
            case 23:besetzenO(1,0);break;
            default:
                switch (gefahr) {
                    case 1:besetzenO(2,2);break;
                    case 2:besetzenO(2,1);break;
                    case 3:besetzenO(2,0);break;
                    case 4:besetzenO(1,0);break;
                    case 5:besetzenO(0,0);break;
                    case 6:besetzenO(0,1);break;
                    case 7:besetzenO(0,2);break;
                    case 8:besetzenO(1,2);break;
                    case 9:besetzenO(2,2);break;
                    case 10:besetzenO(1,1);break;
                    case 11:besetzenO(0,0);break;
                    case 12:besetzenO(0,2);break;
                    case 13:besetzenO(2,0);break;
                    case 14:besetzenO(1,1);break;
                    case 15:besetzenO(0,0);break;
                    case 16:besetzenO(2,2);break;
                    case 17:besetzenO(2,0);break;
                    case 18:besetzenO(0,2);break;
                    case 19:besetzenO(1,1);break;
                    case 20:besetzenO(1,1);break;
                    case 21:besetzenO(0,1);break;
                    case 22:besetzenO(2,1);break;
                    case 23:besetzenO(1,0);break;
                    case 24:besetzenO(1,2);break;
                    default:randombesetzenO();break;
                }
            break;
        }
    }
}

function erkenneGefahr(){
    //Es gibt 24 Möglichkeiten das Spiel zu verliern
    //Hier werden alle ausprobiert und falls eine besteht zurückgegeben;
    //0 steht für keine direkte Möglichkeit zu verlieren;
    var gefahr=0;
    if(XO[1][1]=="X"){                      
        if(XO[0][0]=="X"){if(XO[2][2]!="O"){gefahr=1;}}
        if(XO[0][1]=="X"){if(XO[2][1]!="O"){gefahr=2;}}
        if(XO[0][2]=="X"){if(XO[2][0]!="O"){gefahr=3;}}
        if(XO[1][2]=="X"){if(XO[1][0]!="O"){gefahr=4;}}
        if(XO[2][2]=="X"){if(XO[0][0]!="O"){gefahr=5;}}
        if(XO[2][1]=="X"){if(XO[0][1]!="O"){gefahr=6;}}
        if(XO[2][0]=="X"){if(XO[0][2]!="O"){gefahr=7;}}
        if(XO[1][0]=="X"){if(XO[1][2]!="O"){gefahr=8;}}
    }
    if(XO[0][2]=="X"){
        if(XO[1][2]=="X"){if(XO[2][2]!="O"){gefahr=9;}}
        if(XO[2][0]=="X"){if(XO[1][1]!="O"){gefahr=10;}}
        if(XO[0][1]=="X"){if(XO[0][0]!="O"){gefahr=11;}}
        if(XO[2][2]=="X"){if(XO[1][2]!="O"){gefahr=24;}}
    }
    if(XO[0][0]=="X"){
        if(XO[0][1]=="X"){if(XO[0][2]!="O"){gefahr=12;}}
        if(XO[1][0]=="X"){if(XO[2][0]!="O"){gefahr=13;}}
        if(XO[2][2]=="X"){if(XO[1][1]!="O"){gefahr=14;}}
        if(XO[0][2]=="X"){if(XO[0][1]!="O"){gefahr=21;}}
        if(XO[2][0]=="X"){if(XO[1][0]!="O"){gefahr=23;}}
    }
    if(XO[2][0]=="X"){
        if(XO[1][0]=="X"){if(XO[0][0]!="O"){gefahr=15;}}
        if(XO[2][1]=="X"){if(XO[2][2]!="O"){gefahr=16;}}
        if(XO[2][2]=="X"){if(XO[2][1]!="O"){gefahr=22;}}    
    }
    if(XO[2][2]=="X"){
        if(XO[2][1]=="X"){if(XO[2][0]!="O"){gefahr=17;}}
        if(XO[1][2]=="X"){if(XO[0][2]!="O"){gefahr=18;}}
    }
    if(XO[1][0]=="X"){if(XO[1][2]=="X"){if(XO[1][1]!="O"){gefahr=20;}}}
    if(XO[0][1]=="X"){if(XO[2][1]=="X"){if(XO[1][1]!="O"){gefahr=19;}}}
    return gefahr;
}

function erkenneWin(){
    //Wie es 24 Möglichkeiten gibt zu verliern gibt es auch 24 zu gewinnen
    //Hier werden alle ausprobiert und zurückgegeben;
    //0 steht für keine direkte Möglichkeit zu gewinnen;
    var Win=0;
    if(XO[1][1]=="O"){                      
        if(XO[0][0]=="O"){if(XO[2][2]!="X"){Win=1;}}
        if(XO[0][1]=="O"){if(XO[2][1]!="X"){Win=2;}}
        if(XO[0][2]=="O"){if(XO[2][0]!="X"){Win=3;}}
        if(XO[1][2]=="O"){if(XO[1][0]!="X"){Win=4;}}
        if(XO[2][2]=="O"){if(XO[0][0]!="X"){Win=5;}}
        if(XO[2][1]=="O"){if(XO[0][1]!="X"){Win=6;}}
        if(XO[2][0]=="O"){if(XO[0][2]!="X"){Win=7;}}
        if(XO[1][0]=="O"){if(XO[1][2]!="X"){Win=8;}}
    }
    if(XO[0][2]=="O"){
        if(XO[1][2]=="O"){if(XO[2][2]!="X"){Win=9;}}
        if(XO[2][0]=="O"){if(XO[1][1]!="X"){Win=10;}}
        if(XO[0][1]=="O"){if(XO[0][0]!="X"){Win=11;}}
        if(XO[2][2]=="O"){if(XO[1][2]!="X"){Win=24;}}
    }
    if(XO[0][0]=="O"){
        if(XO[0][1]=="O"){if(XO[0][2]!="X"){Win=12;}}
        if(XO[1][0]=="O"){if(XO[2][0]!="X"){Win=13;}}
        if(XO[2][2]=="O"){if(XO[1][1]!="X"){Win=14;}}
        if(XO[0][2]=="O"){if(XO[0][1]!="X"){Win=21;}}
        if(XO[2][0]=="O"){if(XO[1][0]!="X"){Win=23;}}
    }
    if(XO[2][0]=="O"){
        if(XO[1][0]=="O"){if(XO[0][0]!="X"){Win=15;}}
        if(XO[2][1]=="O"){if(XO[2][2]!="X"){Win=16;}}
        if(XO[2][2]=="O"){if(XO[2][1]!="X"){Win=22;}}
    }
    if(XO[2][2]=="O"){
        if(XO[2][1]=="O"){if(XO[2][0]!="X"){Win=17;}}
        if(XO[1][2]=="O"){if(XO[0][2]!="X"){Win=18;}}}
    if(XO[1][0]=="O"){
        if(XO[1][2]=="O"){if(XO[1][1]!="X"){Win=20;}}}
    if(XO[0][1]=="O"){
        if(XO[2][1]=="O"){if(XO[1][1]!="X"){Win=19;}}}
    return Win;
}