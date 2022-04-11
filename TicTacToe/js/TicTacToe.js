var besetzt;
var XO;
var zuege=0;
var Spielmodus=1;
var playing=true;
const field00="TicTacToe_00";
const field01="TicTacToe_01";
const field02="TicTacToe_02";
const field10="TicTacToe_10";
const field11="TicTacToe_11";
const field12="TicTacToe_12";
const field20="TicTacToe_20";
const field21="TicTacToe_21";
const field22="TicTacToe_22";
const winnerColor="red";
const cellColor1="#CCCCCC";
const cellColor2="#737272";

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
}
function reset(){
    document.location.reload();
}

function print(){
    for(i=0;i<besetzt.length;i++){
        console.log(XO[i][0]+XO[i][1]+XO[i][2]);
    }
}

function besetzen(row,col){
    if(playing){
        if(!besetzt[row][col]){
            if((zuege%2)==0){
                besetzenX(row,col);
            }else{
                besetzenO(row,col);
            }
            if(Spielmodus==1){
                botPlay();
            }
        }
    }
}
function besetzenX(row,col){
    zuege++;
    besetzt[row][col]=true;
    XO[row][col]="X";
    document.getElementById("TicTacToe_"+row+col).innerHTML="X";
    document.getElementById("TicTacToe_"+row+col).style.background=cellColor1;
    var win;
    win=getGewinner();
        if(win=="X"){
            console.log("X won!");
            playing=false;
        }
}
function besetzenO(row,col){
    zuege++;
    besetzt[row][col]=true;
    XO[row][col]="O";
    document.getElementById("TicTacToe_"+row+col).innerHTML="O";
    document.getElementById("TicTacToe_"+row+col).style.background=cellColor2;
    var win;
    win=getGewinner();
        if(win=="O"){
            console.log("O won!");
            playing=false;
        }
}
  
function getGewinner(){
    if(XO[0][0]=="X" && XO[1][1]=="X" && XO[2][2]=="X"){
        document.getElementById(field00).style.background=winnerColor;
        document.getElementById(field11).style.background=winnerColor;
        document.getElementById(field22).style.background=winnerColor;
        zuege=9;
        return "X";
    }else if(XO[0][0]=="X" && XO[0][1]=="X" && XO[0][2]=="X"){
        document.getElementById(field00).style.background=winnerColor;
        document.getElementById(field01).style.background=winnerColor;
        document.getElementById(field02).style.background=winnerColor;
        zuege=9;
        return "X";
    }else if(XO[0][0]=="X" && XO[1][0]=="X" && XO[2][0]=="X"){
        document.getElementById(field00).style.background=winnerColor;
        document.getElementById(field10).style.background=winnerColor;
        document.getElementById(field20).style.background=winnerColor;
        zuege=9;
        return "X";
    }else if(XO[0][1]=="X" && XO[1][1]=="X" && XO[2][1]=="X"){
        document.getElementById(field01).style.background=winnerColor;
        document.getElementById(field11).style.background=winnerColor;
        document.getElementById(field21).style.background=winnerColor;
        zuege=9;
        return "X";
    }else if(XO[0][2]=="X" && XO[1][2]=="X" && XO[2][2]=="X"){
        document.getElementById(field02).style.background=winnerColor;
        document.getElementById(field12).style.background=winnerColor;
        document.getElementById(field22).style.background=winnerColor;
        zuege=9;
        return "X";
    }else if(XO[0][2]=="X" && XO[1][1]=="X" && XO[2][0]=="X"){
        document.getElementById(field02).style.background=winnerColor;
        document.getElementById(field11).style.background=winnerColor;
        document.getElementById(field20).style.background=winnerColor;
        zuege=9;
        return "X";
    }else if(XO[1][0]=="X" && XO[1][1]=="X" && XO[1][2]=="X"){
        document.getElementById(field10).style.background=winnerColor;
        document.getElementById(field11).style.background=winnerColor;
        document.getElementById(field12).style.background=winnerColor;
        zuege=9;
        return "X";
    }else if(XO[2][0]=="X" && XO[2][1]=="X" && XO[2][2]=="X"){
        document.getElementById(field20).style.background=winnerColor;
        document.getElementById(field21).style.background=winnerColor;
        document.getElementById(field22).style.background=winnerColor;
        zuege=9;
        return "X";
    }
    else if(XO[0][0]=="O" && XO[1][1]=="O" && XO[2][2]=="O"){
        document.getElementById(field00).style.background=winnerColor;
        document.getElementById(field11).style.background=winnerColor;
        document.getElementById(field22).style.background=winnerColor;
        zuege=9;
        return "O";
    }else if(XO[0][0]=="O" && XO[0][1]=="O" && XO[0][2]=="O"){
        document.getElementById(field00).style.background=winnerColor;
        document.getElementById(field01).style.background=winnerColor;
        document.getElementById(field02).style.background=winnerColor;
        zuege=9;
        return "O";
    }else if(XO[0][0]=="O" && XO[1][0]=="O" && XO[2][0]=="O"){
        document.getElementById(field00).style.background=winnerColor;
        document.getElementById(field10).style.background=winnerColor;
        document.getElementById(field20).style.background=winnerColor;
        zuege=9;
        return "O";
    }else if(XO[0][1]=="O" && XO[1][1]=="O" && XO[2][1]=="O"){
        document.getElementById(field01).style.background=winnerColor;
        document.getElementById(field11).style.background=winnerColor;
        document.getElementById(field21).style.background=winnerColor;
        zuege=9;
        return "O";
    }else if(XO[0][2]=="O" && XO[1][2]=="O" && XO[2][2]=="O"){
        document.getElementById(field02).style.background=winnerColor;
        document.getElementById(field12).style.background=winnerColor;
        document.getElementById(field22).style.background=winnerColor;
        zuege=9;
        return "O";
    }else if(XO[0][2]=="O" && XO[1][1]=="O" && XO[2][0]=="O"){
        document.getElementById(field02).style.background=winnerColor;
        document.getElementById(field11).style.background=winnerColor;
        document.getElementById(field20).style.background=winnerColor;
        zuege=9;
        return "O";
    }else if(XO[1][0]=="O" && XO[1][1]=="O" && XO[1][2]=="O"){
        document.getElementById(field10).style.background=winnerColor;
        document.getElementById(field11).style.background=winnerColor;
        document.getElementById(field12).style.background=winnerColor;
        zuege=9;
        return "O";
    }else if(XO[2][0]=="O" && XO[2][1]=="O" && XO[2][2]=="O"){
        document.getElementById(field20).style.background=winnerColor;
        document.getElementById(field21).style.background=winnerColor;
        document.getElementById(field22).style.background=winnerColor;
        zuege=9;
        return "O";
    }else{return "nope";}
    
}


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
        if(gefahr==1){
            besetzenO(2,2);
        }else if(gefahr==2){
            besetzenO(2,1);
        }else if(gefahr==3){
            besetzenO(2,0);
        }else if(gefahr==4){
            besetzenO(1,0);
        }else if(gefahr==5){
            besetzenO(0,0);
        }else if(gefahr==6){
            besetzenO(0,1);
        }else if(gefahr==7){
            besetzenO(0,2);
        }else if(gefahr==8){
            besetzenO(1,2);
        }else if(gefahr==9){
            besetzenO(2,2);
        }else if(gefahr==10){
            besetzenO(1,1);
        }else if(gefahr==11){
            besetzenO(0,0);
        }else if(gefahr==12){
            besetzenO(0,2);
        }else if(gefahr==13){
            besetzenO(2,0);
        }else if(gefahr==14){
            besetzenO(1,1);
        }else if(gefahr==15){
            besetzenO(0,0);
        }else if(gefahr==16){
            besetzenO(2,2);
        }else if(gefahr==17){
            besetzenO(2,0);
        }else if(gefahr==18){
            besetzenO(0,2);
        }else if(gefahr==19){
            besetzenO(1,1);
        }else if(gefahr==20){
            besetzenO(1,1);
        }else if(gefahr==21){
            besetzenO(0,1);
        }else if(gefahr==22){
            besetzenO(2,1);
        }else if(gefahr==23){
            besetzenO(1,0);
        }else if(gefahr==24){
            besetzenO(1,2);
        }else{                              //Wenn keine Gefahr besteht zu verlieren, müssen alle Fälle abgedeckt werden und vorrauschauend handeln;
            if(bef==1){
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
            }else if(bef==2){
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
            }else if(bef==3){
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
            }else if(bef==4){
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
            }else if(bef==5){
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
            }else if(bef==6){
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
            }else if(bef==7){
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
            }else if(bef==8){
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
            }else{
                randombesetzenO();
            }
        }
    }
    if(zuege==5){
        var gefahr= erkenneGefahr();
        var Win= erkenneWin();
        if(Win==1){                          //Wenn die Möglichkeit besteht zu gewinnen, wird diese ergriffen;
            besetzenO(2,2);
        }else if(Win==2){
            besetzenO(2,1);
        }else if(Win==3){
            besetzenO(2,0);
        }else if(Win==4){
            besetzenO(1,0);
        }else if(Win==5){
            besetzenO(0,0);
        }else if(Win==6){
            besetzenO(0,1);
        }else if(Win==7){
            besetzenO(0,2);
        }else if(Win==8){
            besetzenO(1,2);
        }else if(Win==9){
            besetzenO(2,2);
        }else if(Win==10){
            besetzenO(1,1);
        }else if(Win==11){
            besetzenO(0,0);
        }else if(Win==12){
            besetzenO(0,2);
        }else if(Win==13){
            besetzenO(2,0);
        }else if(Win==14){
            besetzenO(1,1);
        }else if(Win==15){
            besetzenO(0,0);
        }else if(Win==16){
            besetzenO(2,2);
        }else if(Win==17){
            besetzenO(2,0);
        }else if(Win==18){
            besetzenO(0,2);
        }else if(Win==19){
            besetzenO(1,1);
        }else if(Win==20){
            besetzenO(1,1);
        }else if(Win==21){
            besetzenO(0,1);
        }else if(Win==22){
            besetzenO(2,1);
        }else if(Win==23){
            besetzenO(1,0);
        }
        else if(gefahr==1){                  //Gefahren zu verlieren abchecken;
            besetzenO(2,2);
        }else if(gefahr==2){
            besetzenO(2,1);
        }else if(gefahr==3){
            besetzenO(2,0);
        }else if(gefahr==4){
            besetzenO(1,0);
        }else if(gefahr==5){
            besetzenO(0,0);
        }else if(gefahr==6){
            besetzenO(0,1);
        }else if(gefahr==7){
            besetzenO(0,2);
        }else if(gefahr==8){
            besetzenO(1,2);
        }else if(gefahr==9){
            besetzenO(2,2);
        }else if(gefahr==10){
            besetzenO(1,1);
        }else if(gefahr==11){
            besetzenO(0,0);
        }else if(gefahr==12){
            besetzenO(0,2);
        }else if(gefahr==13){
            besetzenO(2,0);
        }else if(gefahr==14){
            besetzenO(1,1);
        }else if(gefahr==15){
            besetzenO(0,0);
        }else if(gefahr==16){
            besetzenO(2,2);
        }else if(gefahr==17){
            besetzenO(2,0);
        }else if(gefahr==18){
            besetzenO(0,2);
        }else if(gefahr==19){
            besetzenO(1,1);
        }else if(gefahr==20){
            besetzenO(1,1);
        }else if(gefahr==21){
            besetzenO(0,1);
        }else if(gefahr==22){
            besetzenO(2,1);
        }else if(gefahr==23){
            besetzenO(1,0);
        }else if(gefahr==24){
            besetzenO(1,2);
        }
        else if(bef==11){                      //ein paar Sonderfälle bei denen Gefahr bestehen könnte;
            besetzenO(2,0);
            bef=41;
        }else if(bef==14){
            besetzenO(2,2);
            bef=42;
        }else if(bef==17){
            besetzenO(0,2);
            bef=43;
        }else if(bef==28){
            besetzenO(1,1);
            bef=44;
        }else if(bef==33){
            besetzenO(1,1);
            bef=45;
        }else if(bef==38){
            besetzenO(1,1);
            bef=46;
        }
        else{                              //ansonsten kann von diesem Zug an keine Falle mehr bereitet werden;
            randombesetzenO();              //es wird ein random Feld besetzt;
        }
    }
    if(zuege==7){
        var gefahr= erkenneGefahr();
        var Win= erkenneWin();
        if(Win==1){                         //Sieg priorisieren;
            besetzenO(2,2);
        }else if(Win==2){
            besetzenO(2,1);
        }else if(Win==3){
            besetzenO(2,0);
        }else if(Win==4){
            besetzenO(1,0);
        }else if(Win==5){
            besetzenO(0,0);
        }else if(Win==6){
            besetzenO(0,1);
        }else if(Win==7){
            besetzenO(0,2);
        }else if(Win==8){
            besetzenO(1,2);
        }else if(Win==9){
            besetzenO(2,2);
        }else if(Win==10){
            besetzenO(1,1);
        }else if(Win==11){
            besetzenO(0,0);
        }else if(Win==12){
            besetzenO(0,2);
        }else if(Win==13){
            besetzenO(2,0);
        }else if(Win==14){
            besetzenO(1,1);
        }else if(Win==15){
            besetzenO(0,0);
        }else if(Win==16){
            besetzenO(2,2);
        }else if(Win==17){
            besetzenO(2,0);
        }else if(Win==18){
            besetzenO(0,2);
        }else if(Win==19){
            besetzenO(1,1);
        }else if(Win==20){
            besetzenO(1,1);
        }else if(Win==21){
            besetzenO(0,1);
        }else if(Win==22){
            besetzenO(2,1);
        }else if(Win==23){
            besetzenO(1,0);
        }
        else if(gefahr==1){                     //verhindern zu verlieren;
            besetzenO(2,2);
        }else if(gefahr==2){
            besetzenO(2,1);
        }else if(gefahr==3){
            besetzenO(2,0);
        }else if(gefahr==4){
            besetzenO(1,0);
        }else if(gefahr==5){
            besetzenO(0,0);
        }else if(gefahr==6){
            besetzenO(0,1);
        }else if(gefahr==7){
            besetzenO(0,2);
        }else if(gefahr==8){
            besetzenO(1,2);
        }else if(gefahr==9){
            besetzenO(2,2);
        }else if(gefahr==10){
            besetzenO(1,1);
        }else if(gefahr==11){
            besetzenO(0,0);
        }else if(gefahr==12){
            besetzenO(0,2);
        }else if(gefahr==13){
            besetzenO(2,0);
        }else if(gefahr==14){
            besetzenO(1,1);
        }else if(gefahr==15){
            besetzenO(0,0);
        }else if(gefahr==16){
            besetzenO(2,2);
        }else if(gefahr==17){
            besetzenO(2,0);
        }else if(gefahr==18){
            besetzenO(0,2);
        }else if(gefahr==19){
            besetzenO(1,1);
        }else if(gefahr==20){
            besetzenO(1,1);
        }else if(gefahr==21){
            besetzenO(0,1);
        }else if(gefahr==22){
            besetzenO(2,1);
        }else if(gefahr==23){
            besetzenO(1,0);
        }else if(gefahr==24){
            besetzenO(1,2);
        }else{
            randombesetzenO();               //random Feld besetzen;
        }
    }

}

function erkenneGefahr(){
    var gefahr=0;
    if(XO[1][1]=="X"){                      //Es gibt 24 Möglichkeiten das Spiel zu verliern
        if(XO[0][0]=="X"){                  //Hier werden alle ausprobiert und falls eine besteht zurückgegeben;
            if(XO[2][2]!="O"){              //0 steht für keine direkte Möglichkeit zu verlieren;
                gefahr=1;
            }
        }
        if(XO[0][1]=="X"){
            if(XO[2][1]!="O"){
                gefahr=2;
            }
        }
        if(XO[0][2]=="X"){
            if(XO[2][0]!="O"){
                gefahr=3;
            }
        }
        if(XO[1][2]=="X"){
            if(XO[1][0]!="O"){
                gefahr=4;
            }
        }
        if(XO[2][2]=="X"){
            if(XO[0][0]!="O"){
                gefahr=5;
            }
        }
        if(XO[2][1]=="X"){        
            if(XO[0][1]!="O"){
                gefahr=6;
            }
        }
        if(XO[2][0]=="X"){
            if(XO[0][2]!="O"){
                gefahr=7;   
            }
        }
        if(XO[1][0]=="X"){
            if(XO[1][2]!="O"){
                gefahr=8; 
            }
        }
    }
    if(XO[0][2]=="X"){
        if(XO[1][2]=="X"){
            if(XO[2][2]!="O"){
                gefahr=9; 
            }
        }
        if(XO[2][0]=="X"){
            if(XO[1][1]!="O"){
                gefahr=10;
            }
        }
        if(XO[0][1]=="X"){
            if(XO[0][0]!="O"){
                gefahr=11;
            }
        }
        if(XO[2][2]=="X"){
            if(XO[1][2]!="O"){
                gefahr=24;
            }
        }
    }
    if(XO[0][0]=="X"){
        if(XO[0][1]=="X"){
            if(XO[0][2]!="O"){
                gefahr=12;
            }
        }
        if(XO[1][0]=="X"){
            if(XO[2][0]!="O"){
                gefahr=13;
            }
        }
        if(XO[2][2]=="X"){
            if(XO[1][1]!="O"){
                gefahr=14;
            }
        }
        if(XO[0][2]=="X"){
            if(XO[0][1]!="O"){
                gefahr=21;
            }
        }
        if(XO[2][0]=="X"){
            if(XO[1][0]!="O"){
                gefahr=23;
            }
        }
    }
    if(XO[2][0]=="X"){
        if(XO[1][0]=="X"){
            if(XO[0][0]!="O"){
                gefahr=15;
            }
        }
        if(XO[2][1]=="X"){
            if(XO[2][2]!="O"){
                gefahr=16;
            }
        }
        if(XO[2][2]=="X"){
            if(XO[2][1]!="O"){
                gefahr=22;
            }
        }    
    }
    if(XO[2][2]=="X"){
        if(XO[2][1]=="X"){
            if(XO[2][0]!="O"){
                gefahr=17;
            }
        }
        if(XO[1][2]=="X"){
            if(XO[0][2]!="O"){
                gefahr=18;
            }
        }
    }
    if(XO[1][0]=="X"){
        if(XO[1][2]=="X"){
            if(XO[1][1]!="O"){
                gefahr=20;
            }
        }
    }
    if(XO[0][1]=="X"){
        if(XO[2][1]=="X"){
            if(XO[1][1]!="O"){
                gefahr=19;
            }
        }
    }
    return gefahr;
}

function erkenneWin(){
    var Win=0;
    if(XO[1][1]=="O"){                      //Wie es 24 Möglichkeiten gibt zu verliern gibt es auch 24 zu gewinnen
        if(XO[0][0]=="O"){                  //Hier werden alle ausprobiert und zurückgegeben;
            if(XO[2][2]!="X"){              //0 steht für keine direkte Möglichkeit zu gewinnen;
                Win=1;
            }
        }
        if(XO[0][1]=="O"){
            if(XO[2][1]!="X"){
                Win=2;
            }
        }
        if(XO[0][2]=="O"){
            if(XO[2][0]!="X"){
                Win=3;
            }
        }
        if(XO[1][2]=="O"){
            if(XO[1][0]!="X"){
                Win=4;
            }
        }
        if(XO[2][2]=="O"){
            if(XO[0][0]!="X"){
                Win=5;
            }
        }
        if(XO[2][1]=="O"){        
            if(XO[0][1]!="X"){
                Win=6;
            }
        }
        if(XO[2][0]=="O"){
            if(XO[0][2]!="X"){
                Win=7;   
            }
        }
        if(XO[1][0]=="O"){
            if(XO[1][2]!="X"){
                Win=8; 
            }
        }
    }
    if(XO[0][2]=="O"){
        if(XO[1][2]=="O"){
            if(XO[2][2]!="X"){
                Win=9; 
            }
        }
        if(XO[2][0]=="O"){
            if(XO[1][1]!="X"){
                Win=10;
            }
        }
        if(XO[0][1]=="O"){
            if(XO[0][0]!="X"){
                Win=11;
            }
        }
        if(XO[2][2]=="O"){
            if(XO[1][2]!="X"){
                Win=24;
            }
        }
    }
    if(XO[0][0]=="O"){
        if(XO[0][1]=="O"){
            if(XO[0][2]!="X"){
                Win=12;
            }
        }
        if(XO[1][0]=="O"){
            if(XO[2][0]!="X"){
                Win=13;
            }
        }
        if(XO[2][2]=="O"){
            if(XO[1][1]!="X"){
                Win=14;
            }
        }
        if(XO[0][2]=="O"){
            if(XO[0][1]!="X"){
                Win=21;
            }
        }
        if(XO[2][0]=="O"){
            if(XO[1][0]!="X"){
                Win=23;
            }
        }
    }
    if(XO[2][0]=="O"){
        if(XO[1][0]=="O"){
            if(XO[0][0]!="X"){
                Win=15;
            }
        }
        if(XO[2][1]=="O"){
            if(XO[2][2]!="X"){
                Win=16;
            }
        }
        if(XO[2][2]=="O"){
            if(XO[2][1]!="X"){
                Win=22;
            }
        }    
    }
    if(XO[2][2]=="O"){
        if(XO[2][1]=="O"){
            if(XO[2][0]!="X"){
                Win=17;
            }
        }
        if(XO[1][2]=="O"){
            if(XO[0][2]!="X"){
                Win=18;
            }
        }
    }
    if(XO[1][0]=="O"){
        if(XO[1][2]=="O"){
            if(XO[1][1]!="X"){
                Win=20;
            }
        }
    }
    if(XO[0][1]=="O"){
        if(XO[2][1]=="O"){
            if(XO[1][1]!="X"){
                Win=19;
            }
        }
    }
    return Win;
}