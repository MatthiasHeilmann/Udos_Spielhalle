//initialiye the gameboard, 1==dark square, 0==light square, [0][0] is a8, [0][1] is b8 and so on
gameboard=[];
gameboard.push([0,4,0,4,0,4,0,4]);
gameboard.push([4,0,4,0,4,0,4,0]);
gameboard.push([0,4,0,4,0,4,0,4]);
gameboard.push([1,0,1,0,1,0,1,0]);
gameboard.push([0,1,0,1,0,1,0,1]);
gameboard.push([2,0,2,0,2,0,2,0]);
gameboard.push([0,2,0,2,0,2,0,2]);
gameboard.push([2,0,2,0,2,0,2,0]);

coordinates=[];
oldcoordinates=[];
legalmoves=[];
//update_gameboard_gui(gameboard);

//pieces: 2==white regular, 3==white queen, 4==black regular, 5==black queen

window.onload = ()=> {
    c = document.getElementById('gameCanvas');
    cc = c.getContext('2d');
    cc.font = '20py Arial';
    update_gameboard_gui(gameboard);
    turn="white";

    while(check_gamegoing(gameboard)==true){
        game_loop(gameboard,turn,c);
        break;
    }
}





//functions gui

function update_gameboard_gui(logicgrid){
    ind2=-1;
    logicgrid.forEach((i,ycoord) => {
        ind2+=1;
        ind1=-1;
        i.forEach((y, xcoord) => {
            ind1+=1;
            

            if (y==0){
                cc.fillStyle='rgb(250, 216, 162)';
                cc.fillRect(ind1*70, ind2*70, 69 ,69);
            }
            if (y>0){ 
                cc.fillStyle='rgb(110, 68, 1)';
                cc.fillRect(ind1*70, ind2*70, 69 ,69);

                if (y==2){
                    cc.fillStyle='rgb(255,255,255)';
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+35,35,20,0,0,2*Math.PI);
                    cc.fill();
                }
                if (y==3){
                    cc.fillStyle='rgb(255,255,255)';
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+25,35,20,0,0,2*Math.PI);
                    cc.fill();
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+45,35,20,0,0,2*Math.PI);
                    cc.fill();

                }
                if (y==4){
                    cc.fillStyle='rgb(0, 0, 0)';
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+35,35,20,0,0,2*Math.PI);
                    cc.fill();

                }
                if (y==5){
                    cc.fillStyle='rgb(0, 0, 0)';
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+25,35,20,0,0,2*Math.PI);
                    cc.fill();
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+45,35,20,0,0,2*Math.PI);
                    cc.fill();

                }
                
            }
            cc.fillStyle='rgb(255,0,0)';
            cc.fillText("y"+ycoord.toString()+" "+"x"+xcoord.toString(),ind1*70, ind2*70+30);
            
            
        });
    });

}

function check_legal_moves(logicgrid,turn){
    cancapture=false;
    captures=[];
    noncaptures=[];
    logicgrid.forEach((y,idxy) => {
        y.forEach((x,idxx) => {
            //white side
            if(turn==="white"){
            //can capture
                
                //regular pieces
                if(x==2){
                    //check for board boundaries

                    //check for possible captures with regular pieces
                    if(logicgrid[idxy-1][idxx-1]>=4 && logicgrid[idxy-2][idxx-2]==1 && idxy>=2 && idxx>=2){
                        captures.push("y"+idxy+"x"+idxx+"c"+"y"+idxy-2+"x"+idxx-2)
                        cancapture=true
                    }
                    if(logicgrid[idxy-1][idxx+1]>=4 && logicgrid[idxy-2][idxx+2]==1 && idxy>=2 && idxx<=5){
                        captures.push("y"+idxy+"x"+idxx+"c"+"y"+idxy-2+"x"+idxx+2)
                        cancapture=true
                    }
                    if(cancapture==false){
                        console.log(logicgrid[idxy-1][idxx-1])
                        if(logicgrid[idxy-1][idxx-1]==1 && idxy>=1 && idxx>=1){
                            noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy-1)+"x"+(idxx-1))
                        }

                        if(logicgrid[idxy-1][idxx+1]==1 && idxy>=2 && idxx<=6){
                            noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy-1)+"x"+(idxx+1))
                        }

                    }
                }
            }   


                //queens

            //else
            
            
            

            //black side
            if(turn==="black"){
                //regular pieces
                if(x==4){
                    //check for board boundaries

                    //check for possible captures with regular pieces
                    if(logicgrid[idxy+1][idxx-1]==2 && logicgrid[idxy+2][idxx-2]==1){
                        captures.push("y"+idxy+"x"+idxx+"c"+"y"+idxy+2+"x"+idxx-2)
                        cancapture=true
                    }
                    if(logicgrid[idxy+1][idxx-1]==3 && logicgrid[idxy+2][idxx-2]==1){
                        captures.push("y"+idxy+"x"+idxx+"c"+"y"+idxy+2+"x"+idxx-2)
                        cancapture=true
                    }
                    if(logicgrid[idxy+1][idxx+1]==2 && logicgrid[idxy+2][idxx+2]==1){
                        captures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+2+"x"+idxx+2)
                        cancapture=true
                    }
                    if(logicgrid[idxy+1][idxx+1]==3 && logicgrid[idxy+2][idxx+2]==1){
                        captures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+2+"x"+idxx+2)
                        cancapture=true
                    }
                    if(cancapture==false){
                        if(logicgrid[idxy+1][idxx-1]==1){
                            noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+1+"x"+idxx-1)
                        }

                        if(logicgrid[idxy+1][idxx+1]==1){
                            noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+1+"x"+idxx+1)
                        }

                    }
                }
            }
                
        });
    });
    if(cancapture==true){
        console.log(captures)
        return captures;
    }
    else{
        console.log(noncaptures)
        return noncaptures;
    }
}

function check_promotion(logicgrid){
    logicgrid.forEach((y,idxy) => {
        y.forEach((x,idxx) => {
            if(x==2 && idxx==0){
                x=3;
            }
            if(x==4 && idxx==7){
                x=5;
            }
        });
    });
}

function check_gamegoing(logicgrid){
    nrwhite=0;
    nrblack=0;
    logicgrid.forEach((y,idxy) => {
        y.forEach((x,idxx) => {
            if(x==2 || x==3){
                nrwhite++
            }
            if(x==4 || x==5){
                nrblack++;
            }
        });
    });
    if(nrwhite==0){
        alert("Black wins!");
        return false;
    }
    if(nrblack==0){
        alert("White wins!")
        return false;
    }
    return true;
}
/////////////////////////////////////////////////////////////
//get Position of cursor functions
function mouseposition(event){
    //console.log(event.clientX)
    //console.log(event.clientY)
    coordinates=getCorrespondingCoordinates(event.clientX,event.clientY);
    console.log(coordinates);
}

function getCorrespondingCoordinates(x, y){
    c=document.getElementById("gameCanvas")
    crect=c.getClientRects();
    const offsetX = crect[0].width/window.innerWidth;
    const offsetY = crect[0].height/window.innerHeight;
    //console.log(crect)
    //console.log(offsetX)
    a=getVectorCoordinate(Math.round((x - crect[0].x) /offsetX),Math.round(y - crect[0].y) / offsetY);

    return a;
}

//70 is the Tile-height and -width
function getVectorCoordinate(x, y){
    let cordX = Math.floor(x / 40);
    let cordY = Math.floor(y / 90);
    //console.log(cordX)
    //console.log(cordY)
    return [cordX,cordY];
}

/////////////////////////////////////////////////////////////

function parse_moves(listmoves,coords){
    update_gameboard_gui(gameboard);
    legalmovechosen=false;
    listmoves.forEach(y => {
        if(y[1]===coords[1].toString() && y[3]===coords[0].toString()){
            cc.fillStyle='rgb(0, 0, 255)';
            cc.fillRect(y[8]*70,y[6]*70, 69 ,69);
            legalmovechosen=true;
        }
    })
    if(legalmovechosen==true){
        oldcoordinates=coordinates;
        c=document.getElementById("gameCanvas");
        c.removeEventListener("click",firstclick);
        c.addEventListener("click", secondclick); 

    }

    
    //c.removeEventListener("click", secondclick);


}

function make_move(move){
    console.log("MOVE CHOSEN:"+ move)
    gameboard[parseInt(move[6])][parseInt(move[8])]=gameboard[parseInt(move[1])][parseInt(move[3])];
    gameboard[parseInt(move[1])][parseInt(move[3])]=1;
    if(move[4]=="c"){
        coord1=1
        coord2=1
        if(parseInt(move[8])-parseInt(move[3])>0){coord2=-1}
        if(parseInt(move[6])-parseInt(move[1])>0){coord1=-1}
        gameboard[parseInt(move[6])+coord1][parseInt(move[8])+coord2]=1;
    }
}

function firstclick(event){
    mouseposition(event);
    parse_moves(legalmoves,coordinates);
}

function secondclick(event){
    secondclickbool=false;
    mouseposition(event);
    legalmoves.forEach(y => {
        //console.log(y[8]+y[6])
        //console.log(coordinates)
        if(parseInt(y[6])===coordinates[1] && parseInt(y[8])===coordinates[0] && secondclickbool==false && parseInt(y[1])===oldcoordinates[1] && parseInt(y[3])===oldcoordinates[0]){
            console.log(y[8]+y[6])
            console.log(coordinates)
            make_move(y);
            secondclickbool=true;
        }
    })
    update_gameboard_gui(gameboard);
    //while(secondclick==false){
        //pass
    //}

}







function game_loop(logicgrid,turn, context){
    if(check_gamegoing(logicgrid)==true){
        legalmoves=check_legal_moves(logicgrid, turn);
        console.log(legalmoves);
        //onclick function for each square displaying legal moves, second click makes the move
        context.addEventListener("click", firstclick)
        check_promotion(logicgrid)
    }
}