// Variables
snakelength=4;
xpos=4;
ypos=4;
fieldstate=[];
for(let i=0;i<9;i++){
    fieldstate.push([0,0,0,0,0,0,0,0,0]);
}
// 0=Neutral
direction=0;
fieldstate[xpos][ypos]=snakelength;

//Variables
yellow=(255,255,150);
green=(0,150,100);


fruit=false;
alive=true;
running=true;
grid=[];


//Browser specific functions
window.onload = ()=> {
    c = document.getElementById('backgroundCanvas');
    cc = c.getContext('2d');
    cc.font = '20px Arial';

    document.body.onkeyup = function(e){
        if(e.key == "ArrowRight"||e.key == "ArrowDown"||e.key == "ArrowUp"||e.key == "ArrowLeft"){
            direction=update_direction(direction, e.key)};
        };


    //c.addEventListener('keydown', this.update_direction, false)
    
    for (let i=0;i<450;i=i+50){
        columns=[]
        for (let x=0;x<450;x=x+50){
            rectangle = (x,i,49,49)
            cc.fillStyle='rgb(200,99,18)';
            cc.fillRect(x,i,49,49);
            columns.push(rectangle);
        grid.push(columns)
        }
    }
    c = document.getElementById('gameCanvas');
    cc = c.getContext('2d');
    cc.font = '20px Arial';
    setInterval(function(){
        if(alive){
            update_rect(fieldstate,snakelength);
            if(direction!=0){
                fulllist=update_position(xpos,ypos,direction);
                xpos=fulllist[0];
                ypos=fulllist[1];
                if(xpos>8 || xpos<0 || ypos>8 || ypos<0){
                    alive=false;
                    lose();
                }
                else{
                    ///////////Shrinking Algorithm
                    fieldstate.forEach((lists,ind1) =>{
                        lists.forEach((x,ind2) =>{
                            if (x>0){
                                y=x-1;
                                fieldstate[ind1][ind2]=y;
                            }
                        })
                    })
                    //Fruit Algorithm
                    if (fruit==false){
                        while(fruit==false){
                            coord1=Math.ceil(Math.random() * 7);
                            coord2=Math.ceil(Math.random() * 7);
                            if(fieldstate[coord1][coord2]==0){
                                fieldstate[coord1][coord2]=-1
                                fruit=true
                            }
                            else{
                                coord1=Math.floor(Math.random() * 9);
                                coord2=Math.floor(Math.random() * 9);
                                if (fieldstate[coord1][coord2]==0){
                                    fieldstate[coord1][coord2]=-1
                                    fruit=true
                                }
                            }
                        }
                    }
                    ///////////
                    if(fieldstate[xpos][ypos]>0){
                        alive=false;
                        lose();
                    }
                    else if (fieldstate[xpos][ypos]==-1){
                        fruit=false;
                        snakelength+=1;
                        fieldstate[xpos][ypos]=snakelength;
                    }
                    else{
                        fieldstate[xpos][ypos]=snakelength;
                    }
                }
            }
        }
        else{
            fieldstate.forEach((i,ind1) => {
                i.forEach((x,ind2) => {
                    switch(x){
                        case 0:
                            cc.fillStyle='rgb(200,99,18)';   
                            break;
                        case -1:
                            cc.fillStyle='rgb(189,15,22)';
                            break;
                        case snakelength:
                            cc.fillStyle='rgb(200,118,140)';
                            break;
                        default:
                            cc.fillStyle='rgb(16, 139, 183)';
                    }
                    cc.fillRect(ind1*50, ind2*50, 49 ,49);
                });
            });
        }
    },300)}

//Definitions (GUI)
function update_rect(logicgrid,snek){  
    cc.clearRect(0, 0, c.width, c.height);
    logicgrid.forEach((i,ind1) => {
        i.forEach((x,ind2) => {
            switch(x){
                case 0: 
                    break;
                case -1:
                    cc.fillStyle='rgb(189,15,22)';
                    cc.fillRect(ind1*50, ind2*50, 49 ,49);
                    break;
                case snek:
                    cc.fillStyle='rgb(200,118,140)';
                    cc.fillRect(ind1*50, ind2*50, 49 ,49);
                    break;
                default:
                    cc.fillStyle='rgb(16, 139, 183)';
                    cc.fillRect(ind1*50, ind2*50, 49 ,49);
            }
            
        });
    });
}
//Definitions (Game Logic)
function update_direction(direction, newdir){
    dir=direction;
    if (newdir ==="ArrowRight" && dir!=3){dir=1;};
    if (newdir ==="ArrowDown" && dir!=4){dir=2;};
    if (newdir ==="ArrowLeft" && dir!=1){dir=3;};
    if (newdir ==="ArrowUp" && dir!=2){dir=4;};
    return dir;
};

function update_position(xpos,ypos,dir){
    switch(dir){
        case 1:
            xpos+=1;
            break;
        case 2:
            ypos+=1;
            break;
        case 3:
            xpos-=1;
            break;
        case 4:
            ypos-=1;
            break;
    }
    poslist=[xpos,ypos];
    return poslist;
}

function lose(){
    document.getElementById("verloren").style.display="inline";
    document.getElementById("verloren").style.visibility="visible";
    document.getElementById("post_game").style.backgroundColor="rgb(189,15,22)";
    document.getElementById("reset").style.animation = "bounce 1.5s infinite";
    document.getElementById("gameCanvas").style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
}

//////////////////////////////////////////////////
//Gameboard Initialization




