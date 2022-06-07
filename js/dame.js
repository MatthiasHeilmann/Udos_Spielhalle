//LEFT TO DO:  online



//initialize the gameboard, 1==dark square, 0==light square, [0][0] is a8, [0][1] is b8 and so on
gameboard=[];

gameboard.push([0,4,0,4,0,4,0,4]);
gameboard.push([4,0,4,0,4,0,4,0]);
gameboard.push([0,4,0,4,0,4,0,4]);
gameboard.push([1,0,1,0,1,0,1,0]);
gameboard.push([0,1,0,1,0,1,0,1]);
gameboard.push([2,0,2,0,2,0,2,0]);
gameboard.push([0,2,0,2,0,2,0,2]);
gameboard.push([2,0,2,0,2,0,2,0]);


/* gameboard.push([0,1,0,1,0,1,0,1]);
gameboard.push([1,0,1,0,1,0,1,0]);
gameboard.push([0,4,0,1,0,1,0,1]);
gameboard.push([3,0,1,0,1,0,1,0]);
gameboard.push([0,4,0,4,0,1,0,1]);
gameboard.push([1,0,1,0,1,0,1,0]);
gameboard.push([0,1,0,1,0,3,0,1]);
gameboard.push([1,0,1,0,1,0,1,0]);
 */

coordinates=[];
oldcoordinates=[];
legalmoves=[];
turn="white";
clickmade=true;
//update_gameboard_gui(gameboard);

//pieces: 2==white regular, 3==white queen, 4==black regular, 5==black queen

window.onload = ()=> {
    c = document.getElementById('gameCanvas');
    cc = c.getContext('2d');
    cc.font = '20py Arial';
    update_gameboard_gui(gameboard);
    game_loop(gameboard,c);
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
                    cc.ellipse((ind1*70+35),(ind2*70)+35,30,20,0,0,2*Math.PI);
                    cc.fill();

                    cc.strokeStyle='rgb(0,0,0)';
                    legalmoves.forEach(z=>{
                        if(z[3]==ind1 && z[1]==ind2){
                            cc.strokeStyle="rgb(255,0,255)"
                        }
                    })
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+35,30,20,0,0,2*Math.PI);
                    cc.stroke();
                }
                if (y==3){
                    cc.fillStyle='rgb(255,255,255)';
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+45,30,20,0,0,2*Math.PI);
                    cc.fill();
                    cc.strokeStyle='rgb(0,0,0)';
                    legalmoves.forEach(z=>{
                        if(z[3]==ind1 && z[1]==ind2){
                            cc.strokeStyle="rgb(255,0,255)"
                        }
                    })
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+45,30,20,0,0,2*Math.PI);
                    cc.stroke();

                    cc.fillStyle='rgb(255,255,255)';
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+25,30,20,0,0,2*Math.PI);
                    cc.fill();
                    
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+25,30,20,0,0,2*Math.PI);
                    cc.stroke();
                }
                if (y==4){
                    cc.fillStyle='rgb(0, 0, 0)';
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+35,30,20,0,0,2*Math.PI);
                    cc.fill();

                    cc.strokeStyle='rgb(255,255,255)';
                    legalmoves.forEach(z=>{
                        if(z[3]==ind1 && z[1]==ind2){
                            cc.strokeStyle="rgb(255,0,255)"
                        }
                    })
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+35,30,20,0,0,2*Math.PI);
                    cc.stroke();

                }
                if (y==5){
                    cc.fillStyle='rgb(0,0,0)';
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+45,30,20,0,0,2*Math.PI);
                    cc.fill();
                    cc.strokeStyle='rgb(255,255,255)';
                    legalmoves.forEach(z=>{
                        if(z[3]==ind1 && z[1]==ind2){
                            cc.strokeStyle="rgb(255,0,255)"
                        }
                    })
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+45,30,20,0,0,2*Math.PI);
                    cc.stroke();

                    cc.fillStyle='rgb(0,0,0)';
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+25,30,20,0,0,2*Math.PI);
                    cc.fill();
                    
                    cc.beginPath();
                    cc.ellipse((ind1*70+35),(ind2*70)+25,30,20,0,0,2*Math.PI);
                    cc.stroke();

                }
                
            }
            //cc.fillStyle='rgb(255,0,0)';
            //cc.fillText("y"+ycoord.toString()+" "+"x"+xcoord.toString(),ind1*70, ind2*70+30);
            
            
        });
    });

}

function check_legal_moves(logicgrid,turn){
    cancapture=false;
    captures=[];
    noncaptures=[];
    //console.log(logicgrid);
    const isBetween = (num1,num2,value) => value >= num1 && value <= num2 ;
    logicgrid.forEach((y,idxy) => {
        y.forEach((x,idxx) => {
            //white side
            if(turn==="white"){
            //can capture
                
                //regular pieces
                if(x==2){
                    //check for board boundaries

                    //check for possible captures with regular pieces
                    if(idxy>=2 && idxx>=2){
                        if(logicgrid[idxy-1][idxx-1]>=4 && logicgrid[idxy-2][idxx-2]==1){
                            captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy-2)+"x"+(idxx-2))
                            cancapture=true
                        }
                    }
                    if(idxy>=2 && idxx<=5){
                        if(logicgrid[idxy-1][idxx+1]>=4 && logicgrid[idxy-2][idxx+2]==1){
                            captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy-2)+"x"+(idxx+2))
                            cancapture=true
                        }
                     }
                    if(cancapture==false){
                        //console.log(logicgrid[idxy-1][idxx-1])
                        if(idxy>=1 && idxx>=1){
                            if(logicgrid[idxy-1][idxx-1]==1){
                                noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy-1)+"x"+(idxx-1))
                            }
                        }
                        if(idxy>=1 && idxx<=6){
                            if(logicgrid[idxy-1][idxx+1]==1){
                                noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy-1)+"x"+(idxx+1))
                            }
                        }

                    }
                }
                if(x==3){
                    for(let i=1;i<=7;i++){
                        if(idxy-i-1>=0 && idxx-i-1>=0){
                            if(logicgrid[idxy-i][idxx-i]>=4 && logicgrid[idxy-i-1][idxx-i-1]==1){
                                captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy-i-1)+"x"+(idxx-i-1))
                                cancapture=true
                                break;
                            }
                            if(logicgrid[idxy-i][idxx-i]!=1){break;}
                        }
                        
                    }
                    for(let i=1;i<=7;i++){
                        if(idxy-i-1>=0 && idxx+i+1<=7){
                            if(logicgrid[idxy-i][idxx+i]>=4 && logicgrid[idxy-i-1][idxx+i+1]==1){
                                captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy-i-1)+"x"+(idxx+i+1))
                                cancapture=true
                                break;
                            }
                            if(logicgrid[idxy-i][idxx+i]!=1){break;}
                        }
                        

                    }
                    for(let i=1;i<=7;i++){
                        if(idxy+i+1<=7 && idxx-i-1>=0){
                            console.log(idxx.toString()+idxy.toString()+i.toString())
                            if(logicgrid[idxy+i][idxx-i]>=4 && logicgrid[idxy+i+1][idxx-i-1]==1){
                                captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy+i+1)+"x"+(idxx-i-1))
                                cancapture=true
                                break;
                            }
                            if(logicgrid[idxy+i][idxx-i]!=1){break;}
                        }
                        
                    }
                    for(let i=1;i<=7;i++){
                        if(idxy+i+1<=7 && idxx+i+1<=7){
                            if(logicgrid[idxy+i][idxx+i]>=4 && logicgrid[idxy+i+1][idxx+i+1]==1){
                                captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy+i+1)+"x"+(idxx+i+1))
                                cancapture=true
                                break;
                            }
                            if(logicgrid[idxy+i][idxx+i]!=1){break;}
                        }
                        
                    }
                    if(cancapture==false){
                        for(let i=0;i<=6;i++){
                            if(idxy-i-1>=0 && idxx-i-1>=0){
                                if(logicgrid[idxy-i-1][idxx-i-1]==1){
                                    noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy-i-1)+"x"+(idxx-i-1))
                                }
                                else{break;}
                            }
                        }
                        for(let i=0;i<=6;i++){
                            if(idxy-i-1>=0 && idxx+i+1<=7){
                                if(logicgrid[idxy-i-1][idxx+i+1]==1){
                                    noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy-i-1)+"x"+(idxx+i+1))
                                }
                                else{break;}
                            }
                        }
                        for(let i=0;i<=6;i++){
                            if(idxy+i+1<=7 && idxx-i-1>=0){
                                //console.log(idxx.toString()+idxy.toString()+i.toString())
                                if(logicgrid[idxy+i+1][idxx-i-1]==1){
                                    noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy+i+1)+"x"+(idxx-i-1))
                                }
                                else{break;}
                            }
                        }
                        for(let i=0;i<=6;i++){
                            if(idxy+i+1<=7 && idxx+i+1<=7){
                                if(logicgrid[idxy+i+1][idxx+i+1]==1){
                                    noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy+i+1)+"x"+(idxx+i+1))
                                }
                                else{break;}
                            }
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
                    if(idxy<=5 && idxx>=2){
                        if(isBetween(2,3,logicgrid[idxy+1][idxx-1]) && logicgrid[idxy+2][idxx-2]==1){
                            captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy+2)+"x"+(idxx-2))
                            cancapture=true
                        }
                    }
                    if(idxy<=5 && idxx<=5){
                        if(isBetween(2,3,logicgrid[idxy+1][idxx+1]) && logicgrid[idxy+2][idxx+2]==1){
                            captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy+2)+"x"+(idxx+2))
                            cancapture=true
                        }
                    }
                    /*
                    if(logicgrid[idxy+1][idxx+1]==3 && logicgrid[idxy+2][idxx+2]==1){
                        captures.push("y"+idxy+"x"+idxx+" "+"y"+idxy+2+"x"+idxx+2)
                        cancapture=true
                    }
                    */
                    if(cancapture==false){
                        if(idxy<=6 && idxx>=1){
                            if(logicgrid[idxy+1][idxx-1]==1){
                                noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy+1)+"x"+(idxx-1))
                        }
                        }
                        if(idxy<=6 && idxx<=6){
                            if(logicgrid[idxy+1][idxx+1]==1){
                                noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy+1)+"x"+(idxx+1))
                            }
                        }

                    }
                }

                

                if(x==5){
                    for(let i=1;i<=7;i++){
                        if(idxy-i-1>=0 && idxx-i-1>=0){
                            if(isBetween(2,3,logicgrid[idxy-i][idxx-i]) && logicgrid[idxy-i-1][idxx-i-1]==1){
                                captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy-i-1)+"x"+(idxx-i-1))
                                cancapture=true
                                break;
                            }
                            if(logicgrid[idxy-i][idxx-i]!=1){break;}
                        }
                        
                    }
                    for(let i=1;i<=7;i++){
                        if(idxy-i-1>=0 && idxx+i+1<=7){
                            if(isBetween(2,3,logicgrid[idxy-i][idxx+i]) && logicgrid[idxy-i-1][idxx+i+1]==1){
                                captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy-i-1)+"x"+(idxx+i+1))
                                cancapture=true
                                break;
                            }
                            if(logicgrid[idxy-i][idxx+i]!=1){break;}
                        }
                        

                    }
                    for(let i=1;i<=7;i++){
                        if(idxy+i+1<=7 && idxx-i-1>=0){
                            console.log(idxx.toString()+idxy.toString()+i.toString())
                            if(isBetween(2,3,logicgrid[idxy+i][idxx-i]) && logicgrid[idxy+i+1][idxx-i-1]==1){
                                captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy+i+1)+"x"+(idxx-i-1))
                                cancapture=true
                                break;
                            }
                            if(logicgrid[idxy+i][idxx-i]!=1){break;}
                        }
                        
                    }
                    for(let i=1;i<=7;i++){
                        if(idxy+i+1<=7 && idxx+i+1<=7){
                            if(isBetween(2,3,logicgrid[idxy+i][idxx+i]) && logicgrid[idxy+i+1][idxx+i+1]==1){
                                captures.push("y"+idxy+"x"+idxx+"c"+"y"+(idxy+i+1)+"x"+(idxx+i+1))
                                cancapture=true
                                break;
                            }
                            if(logicgrid[idxy+i][idxx+i]!=1){break;}
                        }
                        
                    }
                    if(cancapture==false){
                        for(let i=0;i<=6;i++){
                            if(idxy-i-1>=0 && idxx-i-1>=0){
                                if(logicgrid[idxy-i-1][idxx-i-1]==1){
                                    noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy-i-1)+"x"+(idxx-i-1))
                                }
                                else{break;}
                            }
                        }
                        for(let i=0;i<=6;i++){
                            if(idxy-i-1>=0 && idxx+i+1<=7){
                                if(logicgrid[idxy-i-1][idxx+i+1]==1){
                                    noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy-i-1)+"x"+(idxx+i+1))
                                }
                                else{break;}
                            }
                        }
                        for(let i=0;i<=6;i++){
                            if(idxy+i+1<=7 && idxx-i-1>=0){
                                //console.log(idxx.toString()+idxy.toString()+i.toString())
                                if(logicgrid[idxy+i+1][idxx-i-1]==1){
                                    noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy+i+1)+"x"+(idxx-i-1))
                                }
                                else{break;}
                            }
                        }
                        for(let i=0;i<=6;i++){
                            if(idxy+i+1<=7 && idxx+i+1<=7){
                                if(logicgrid[idxy+i+1][idxx+i+1]==1){
                                    noncaptures.push("y"+idxy+"x"+idxx+" "+"y"+(idxy+i+1)+"x"+(idxx+i+1))
                                }
                                else{break;}
                            }
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

function check_promotion(){
    gameboard.forEach((y,idxy) => {
        y.forEach((x,idxx) => {
            if(x==2 && idxy==0){
                gameboard[0][idxx]=3;
            }
            if(x==4 && idxy==7){
                gameboard[7][idxx]=5;
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
                nrwhite++;
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
    let c=document.getElementById("gameCanvas")
    let crect=c.getClientRects();
    const offsetX = crect[0].width/c.width;
    const offsetY = crect[0].height/c.height;
    //console.log(crect)
    //console.log(offsetX)
    a=getVectorCoordinate(Math.round((x - crect[0].x) /offsetX),Math.round(y - crect[0].y) / offsetY);

    return a;
}

//70 is the Tile-height and -width
function getVectorCoordinate(x, y){
    let cordX = Math.floor(x / 70);
    let cordY = Math.floor(y / 70);
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
            if(y[4]=="c"){
                cc.fillStyle='rgb(189, 15, 22)';
            }
            else{
            cc.fillStyle='rgb(16, 139, 183)';
            }
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
    else{
        update_gameboard_gui(gameboard);
    }
    
    //


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
    capturemade=false;
    oldcapture="";
    mouseposition(event);
    legalmoves.forEach(y => {
        //console.log(y[8]+y[6])
        //console.log(coordinates)
        if(parseInt(y[6])===coordinates[1] && parseInt(y[8])===coordinates[0] && secondclickbool==false && parseInt(y[1])===oldcoordinates[1] && parseInt(y[3])===oldcoordinates[0]){
            //console.log(y[8]+y[6])
            //console.log(coordinates)
            if(y[4]=="c"){
                console.log("captured!")
                capturemade=true;
                oldcapture=y;
            }
            make_move(y);
            secondclickbool=true;
            clickmade=true;
        }
    })

    if(secondclickbool==false){
        c=document.getElementById("gameCanvas");
        c.removeEventListener("click", secondclick);
        c.addEventListener("click",firstclick);
        firstclick(event);
    }
    else{
        check_promotion();
        update_gameboard_gui(gameboard);
        c=document.getElementById("gameCanvas");
        c.removeEventListener("click", secondclick);
        if(capturemade==true){
            checknewcapture=check_legal_moves(gameboard,turn);
            checkbool=false
            checknewcapture.forEach(extramove =>{
                if(checkbool==false){
                    if(extramove[4]=="c" && extramove[1]==oldcapture[6] && extramove[3]==oldcapture[8]){
                        console.log(extramove[1]+oldcapture[6]+extramove[3]+oldcapture[8])
                        if(turn=="white"){
                            turn="black";
                        }
                        else{
                            turn="white";
                        }
                        checkbool=true;
                    }
                }
                
            });
        }
        if(turn=="white"){
            turn="black";
        }
        else{
            turn="white";
        }
        
        game_loop(gameboard,c);
    }
    //while(secondclick==false){
        //pass
    //}

}

function show_legal_moves(legalmoves){
    c=document.getElementById("gameCanvas");
    cc = c.getContext('2d');
    cc.fillStyle="rgb(255,0,255)";
    legalmoves.forEach(y=>{
        cc.fillRect(y[3]*70,y[1]*70, 69 ,69);
    })

}

function game_loop(logicgrid,context){
    if(check_gamegoing(logicgrid)==true){
        legalmoves=check_legal_moves(logicgrid, turn);
        update_gameboard_gui(gameboard);
        clickmade=false;
        
        //show_legal_moves(legalmoves);
        //console.log(legalmoves);
        //onclick function for each square displaying legal moves, second click makes the move
        context.addEventListener("click", firstclick)
        
    }
}