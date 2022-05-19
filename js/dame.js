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

//update_gameboard_gui(gameboard);

//pieces: 2==white regular, 3==white queen, 4==black regular, 5==black queen

window.onload = ()=> {
    c = document.getElementById('gameCanvas');
    cc = c.getContext('2d');
    cc.font = '20py Arial';

    update_gameboard_gui(gameboard);
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
    logicgrid.forEach(y,idxy => {
        y.forEach(x,idxx => {
            //white side
            if(turn=="white"){
            //can capture
                
                //regular pieces
                if(x==2){
                    //check for board boundaries

                    //check for possible captures with regular pieces
                    if(logicgrid[idxy-1][idxx-1]>=4 && logicgrid[idxy-2][idxx-2]==0){
                        captures.push("y"+idxy+"x"+idxx+" "+"y"+idxy-2+"x"+idxx-2)
                        cancapture=true
                    }
                    if(logicgrid[idxy-1][idxx+1]>=4 && logicgrid[idxy-2][idxx+2]==0){
                        captures.push("y"+idxy+"x"+idxx+" "+"y"+idxy-2+"x"+idxx+2)
                        cancapture=true
                    }
                    if(cancapture==false){
                        if(logicgrid[idxy-1][idxx-1]==0){
                            noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+idxy-1+"x"+idxx-1)
                        }

                        if(logicgrid[idxy-1][idxx+1]==0){
                            noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+idxy-1+"x"+idxx+1)
                        }

                    }
                }
            }   


                //queens

            //else
            
            
            

            //black side
            if(turn=="black"){
                //regular pieces
                if(x==4){
                    //check for board boundaries

                    //check for possible captures with regular pieces
                    if(logicgrid[idxy+1][idxx-1]==2 && logicgrid[idxy+2][idxx-2]==0){
                        captures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+2+"x"+idxx-2)
                        cancapture=true
                    }
                    if(logicgrid[idxy+1][idxx-1]==3 && logicgrid[idxy+2][idxx-2]==0){
                        captures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+2+"x"+idxx-2)
                        cancapture=true
                    }
                    if(logicgrid[idxy+1][idxx+1]==2 && logicgrid[idxy+2][idxx+2]==0){
                        captures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+2+"x"+idxx+2)
                        cancapture=true
                    }
                    if(logicgrid[idxy+1][idxx+1]==3 && logicgrid[idxy+2][idxx+2]==0){
                        captures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+2+"x"+idxx+2)
                        cancapture=true
                    }
                    if(cancapture==false){
                        if(logicgrid[idxy+1][idxx-1]==0){
                            noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+1+"x"+idxx-1)
                        }

                        if(logicgrid[idxy+1][idxx+1]==0){
                            noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+1+"x"+idxx+1)
                        }

                    }
                }
            }
                
        });
    });
    if(cancapture==true){
        return captures;
    }
    else{
        return noncaptures;
    }
}

function check_promotion(logicgrid){
    logicgrid.forEach(y,idxy => {
        y.forEach(x,idxx => {
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
    logicgrid.forEach(y,idxy => {
        y.forEach(x,idxx => {
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



function game_loop(logicgrid){
    turn="white";
    if(check_gamegoing(logicgrid)==true){
        legalmoves=check_legal_moves(logicgrid, turn);
        //onclick function for each square displaying legal moves, second click makes the move



        check_promotion(logicgrid)
    }
}