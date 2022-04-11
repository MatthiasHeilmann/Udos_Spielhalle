package Model;
import java.util.Random;
import java.util.*;
import View.*;

public class TicTacToeFeld extends Observable{
    private boolean[][]besetzt = new boolean[3][3];
    private String[][]XO= new String[3][3];
    private int zuege=0;
    private int Spielmodus;
    private Bot bot;
    private boolean restarted;
    public TicTacToeFeld(int s){
        this.start(s);
    }

    public TicTacToeFeld(){
    }

    public void start(int s){
        this.besetzt = new boolean[3][3];
        this.XO= new String[3][3];
        Spielmodus=s;
        if(Spielmodus==1){
            bot= new Bot(this); 
        }
    }

    public void print(){
        if(Spielmodus==1){
            System.out.println("Spiel gegen Computer");
        }else if(Spielmodus==2){
            System.out.println("Spielmodus 1v1");
        }
        for(int i=0; i<this.besetzt.length;i++){
            for(int j=0; j<this.besetzt[i].length;j++){
                if(!besetzt[i][j]){
                    System.out.print("[ ]");
                }else{
                    System.out.print(" ? ");
                }
            }
            System.out.println();
        }
    }

    public void restart(int s){
        this.besetzt=null;
        this.XO=null;
        this.zuege=0;
        this.start(s);
        this.setChanged();
        this.notifyObservers();
    }

    public boolean getBesetzt(int row, int col){
        return besetzt[row][col];
    }

    public boolean[][] getBesetztGanz(){
        return besetzt;
    }

    public String getXO(int row, int col){
        return XO[row][col];
    }

    public String[][] getXOGanz(){
        return XO;
    }

    public void lockedIn(int col){
        this.start(col);
        this.setChanged();
        this.notifyObservers();
    }

    public void besetzen(int row, int col){
        if(!besetzt[row][col]){
            if(zuege==0||zuege==2||zuege==4||zuege==6||zuege==8){
                XO[row][col]="X";
            }else{
                XO[row][col]="O";
            }
            zuege++;
            besetzt[row][col]=true;
            this.setChanged();
            this.notifyObservers();
            if(Spielmodus==1){
                if(zuege==1||zuege==3||zuege==5||zuege==7){
                    this.bot.play(this.besetzt,this.XO,this.zuege);
                }
            }
        }
    }

    private class Bot{
        private boolean[][]besetzt;         //der Bot muss wissen welche Felder besetzt sind;
        private String[][] XO;              //der Bot muss wissen mit was das Feld besetzt ist;    
        private int zuege;                  //der Bot muss die Anzahl der Zuege kennen;
        private TicTacToeFeld feld;         //der Bot muss eine Verbindung zum Feld haben;
        private int bef;       

        private Bot(TicTacToeFeld feld){
            this.feld=feld;
        }

        private void randomBesetzen(){
            for(int i=0;i<this.besetzt.length;i++){
                for(int j=0; j<this.besetzt[0].length;j++){
                    if(!besetzt[i][j]){
                        this.feld.besetzen(i,j);    
                        return;
                    }
                }   
            }
        }

        private void play(boolean[][] besetzt, String[][] XO, int zuege){
            this.besetzt=besetzt;
            this.XO=XO;
            this.zuege=zuege;
            if(zuege==1){                           //alle 9 Möglichkeiten für den ersten Zug;
                if(besetzt[1][1]){
                    this.feld.besetzen(2,0);
                    bef=0;
                }else if(besetzt[0][0]){
                    this.feld.besetzen(1,1);
                    bef=1;
                }else if(besetzt[2][0]){
                    this.feld.besetzen(1,1);
                    bef=2;
                }else if(besetzt[2][2]){
                    this.feld.besetzen(1,1);
                    bef=3;
                }else if(besetzt[0][2]){
                    this.feld.besetzen(1,1);
                    bef=4;
                }else if(besetzt[1][0]){
                    this.feld.besetzen(0,0);
                    bef=5;
                }else if(besetzt[0][1]){
                    this.feld.besetzen(0,2);
                    bef=6;
                }else if(besetzt[1][2]){
                    this.feld.besetzen(2,2);
                    bef=7;
                }else if(besetzt[2][1]){
                    this.feld.besetzen(2,0);
                    bef=8;
                }
            }
            if(zuege==3){
                int gefahr= erkenneGefahr();        //wenn Gefahr besteht zu verlieren, dementsprechend handeln;
                if(gefahr==1){
                    this.feld.besetzen(2,2);
                }else if(gefahr==2){
                    this.feld.besetzen(2,1);
                }else if(gefahr==3){
                    this.feld.besetzen(2,0);
                }else if(gefahr==4){
                    this.feld.besetzen(1,0);
                }else if(gefahr==5){
                    this.feld.besetzen(0,0);
                }else if(gefahr==6){
                    this.feld.besetzen(0,1);
                }else if(gefahr==7){
                    this.feld.besetzen(0,2);
                }else if(gefahr==8){
                    this.feld.besetzen(1,2);
                }else if(gefahr==9){
                    this.feld.besetzen(2,2);
                }else if(gefahr==10){
                    this.feld.besetzen(1,1);
                }else if(gefahr==11){
                    this.feld.besetzen(0,0);
                }else if(gefahr==12){
                    this.feld.besetzen(0,2);
                }else if(gefahr==13){
                    this.feld.besetzen(2,0);
                }else if(gefahr==14){
                    this.feld.besetzen(1,1);
                }else if(gefahr==15){
                    this.feld.besetzen(0,0);
                }else if(gefahr==16){
                    this.feld.besetzen(2,2);
                }else if(gefahr==17){
                    this.feld.besetzen(2,0);
                }else if(gefahr==18){
                    this.feld.besetzen(0,2);
                }else if(gefahr==19){
                    this.feld.besetzen(1,1);
                }else if(gefahr==20){
                    this.feld.besetzen(1,1);
                }else if(gefahr==21){
                    this.feld.besetzen(0,1);
                }else if(gefahr==22){
                    this.feld.besetzen(2,1);
                }else if(gefahr==23){
                    this.feld.besetzen(1,0);
                }else if(gefahr==24){
                    this.feld.besetzen(1,2);
                }else{                              //Wenn keine Gefahr besteht zu verlieren, müssen alle Fälle abgedeckt werden und vorrauschauend handeln;
                    if(bef==1){
                        if(besetzt[2][1]){
                            this.feld.besetzen(1,2);
                            bef=9;
                        }else if(besetzt[2][2]){
                            this.feld.besetzen(1,0);
                            bef=10;
                        }else if(besetzt[1][2]){
                            this.feld.besetzen(0,1);
                            bef=11;
                        }
                    }else if(bef==2){
                        if(besetzt[1][2]){
                            this.feld.besetzen(0,1);
                            bef=12;
                        }else if(besetzt[0][2]){
                            this.feld.besetzen(2,1);
                            bef=13;
                        }else if(besetzt[0][1]){
                            this.feld.besetzen(1,0);
                            bef=14;
                        }
                    }else if(bef==3){
                        if(besetzt[0][1]){
                            this.feld.besetzen(1,0);
                            bef=15;
                        }else if(besetzt[0][0]){
                            this.feld.besetzen(2,1);
                            bef=16;
                        }else if(besetzt[1][0]){
                            this.feld.besetzen(2,1);
                            bef=17;
                        }
                    }else if(bef==4){
                        if(besetzt[1][0]){
                            this.feld.besetzen(2,1);
                            bef=18;
                        }else if(besetzt[2][0]){
                            this.feld.besetzen(0,1);
                            bef=19;
                        }else if(besetzt[2][1]){
                            this.feld.besetzen(1,2);
                            bef=20;
                        }   
                    }else if(bef==5){
                        if(besetzt[2][0]){
                            this.feld.besetzen(1,1);
                            bef=21;
                        }else if(besetzt[2][1]){
                            this.feld.besetzen(0,2);
                            bef=22;
                        }else if(besetzt[2][2]){
                            this.feld.besetzen(0,2);
                            bef=23;
                        }else if(besetzt[0][2]){
                            this.feld.besetzen(1,1);
                            bef=24;
                        }else if(besetzt[0][1]){
                            this.feld.besetzen(1,1);
                            bef=25;
                        }
                    }else if(bef==6){
                        if(besetzt[0][0]){
                            this.feld.besetzen(1,1);
                            bef=26;
                        }else if(besetzt[1][0]){
                            this.feld.besetzen(2,2);
                            bef=27;
                        }   else if(besetzt[2][0]){
                            this.feld.besetzen(2,2);
                            bef=28;
                        }else if(besetzt[2][2]){
                            this.feld.besetzen(1,1);
                            bef=29;
                        }else if(besetzt[1][2]){
                            this.feld.besetzen(1,1);
                            bef=30;
                        }
                    }else if(bef==7){
                        if(besetzt[0][2]){
                            this.feld.besetzen(1,1);
                            bef=31;
                        }else if(besetzt[0][1]){
                            this.feld.besetzen(2,0);
                            bef=32;
                        }else if(besetzt[0][0]){
                            this.feld.besetzen(2,0);
                            bef=33;
                        }else if(besetzt[2][0]){
                            this.feld.besetzen(1,1);
                            bef=34;
                        }else if(besetzt[2][1]){
                            this.feld.besetzen(1,1);
                            bef=35;
                        }
                    }else if(bef==8){
                        if(besetzt[2][2]){
                            this.feld.besetzen(1,1);
                            bef=36;
                        }else if(besetzt[1][2]){
                            this.feld.besetzen(0,0);
                            bef=37;
                        }else if(besetzt[0][2]){
                            this.feld.besetzen(0,0);
                            bef=38;
                        }else if(besetzt[0][0]){
                            this.feld.besetzen(1,1);
                            bef=39;
                        }else if(besetzt[1][0]){
                            this.feld.besetzen(1,1);
                            bef=40;
                        }
                    }else{
                        randomBesetzen();
                    }
                }
            }
            if(zuege==5){
                int gefahr= erkenneGefahr();
                int Win= erkenneWin();
                if(Win==1){                          //Wenn die Möglichkeit besteht zu gewinnen, wird diese ergriffen;
                    this.feld.besetzen(2,2);
                }else if(Win==2){
                    this.feld.besetzen(2,1);
                }else if(Win==3){
                    this.feld.besetzen(2,0);
                }else if(Win==4){
                    this.feld.besetzen(1,0);
                }else if(Win==5){
                    this.feld.besetzen(0,0);
                }else if(Win==6){
                    this.feld.besetzen(0,1);
                }else if(Win==7){
                    this.feld.besetzen(0,2);
                }else if(Win==8){
                    this.feld.besetzen(1,2);
                }else if(Win==9){
                    this.feld.besetzen(2,2);
                }else if(Win==10){
                    this.feld.besetzen(1,1);
                }else if(Win==11){
                    this.feld.besetzen(0,0);
                }else if(Win==12){
                    this.feld.besetzen(0,2);
                }else if(Win==13){
                    this.feld.besetzen(2,0);
                }else if(Win==14){
                    this.feld.besetzen(1,1);
                }else if(Win==15){
                    this.feld.besetzen(0,0);
                }else if(Win==16){
                    this.feld.besetzen(2,2);
                }else if(Win==17){
                    this.feld.besetzen(2,0);
                }else if(Win==18){
                    this.feld.besetzen(0,2);
                }else if(Win==19){
                    this.feld.besetzen(1,1);
                }else if(Win==20){
                    this.feld.besetzen(1,1);
                }else if(Win==21){
                    this.feld.besetzen(0,1);
                }else if(Win==22){
                    this.feld.besetzen(2,1);
                }else if(Win==23){
                    this.feld.besetzen(1,0);
                }
                else if(gefahr==1){                  //Gefahren zu verlieren abchecken;
                    this.feld.besetzen(2,2);
                }else if(gefahr==2){
                    this.feld.besetzen(2,1);
                }else if(gefahr==3){
                    this.feld.besetzen(2,0);
                }else if(gefahr==4){
                    this.feld.besetzen(1,0);
                }else if(gefahr==5){
                    this.feld.besetzen(0,0);
                }else if(gefahr==6){
                    this.feld.besetzen(0,1);
                }else if(gefahr==7){
                    this.feld.besetzen(0,2);
                }else if(gefahr==8){
                    this.feld.besetzen(1,2);
                }else if(gefahr==9){
                    this.feld.besetzen(2,2);
                }else if(gefahr==10){
                    this.feld.besetzen(1,1);
                }else if(gefahr==11){
                    this.feld.besetzen(0,0);
                }else if(gefahr==12){
                    this.feld.besetzen(0,2);
                }else if(gefahr==13){
                    this.feld.besetzen(2,0);
                }else if(gefahr==14){
                    this.feld.besetzen(1,1);
                }else if(gefahr==15){
                    this.feld.besetzen(0,0);
                }else if(gefahr==16){
                    this.feld.besetzen(2,2);
                }else if(gefahr==17){
                    this.feld.besetzen(2,0);
                }else if(gefahr==18){
                    this.feld.besetzen(0,2);
                }else if(gefahr==19){
                    this.feld.besetzen(1,1);
                }else if(gefahr==20){
                    this.feld.besetzen(1,1);
                }else if(gefahr==21){
                    this.feld.besetzen(0,1);
                }else if(gefahr==22){
                    this.feld.besetzen(2,1);
                }else if(gefahr==23){
                    this.feld.besetzen(1,0);
                }else if(gefahr==24){
                    this.feld.besetzen(1,2);
                }
                else if(bef==11){                      //ein paar Sonderfälle bei denen Gefahr bestehen könnte;
                    this.feld.besetzen(2,0);
                    bef=41;
                }else if(bef==14){
                    this.feld.besetzen(2,2);
                    bef=42;
                }else if(bef==17){
                    this.feld.besetzen(0,2);
                    bef=43;
                }else if(bef==28){
                    this.feld.besetzen(1,1);
                    bef=44;
                }else if(bef==33){
                    this.feld.besetzen(1,1);
                    bef=45;
                }else if(bef==38){
                    this.feld.besetzen(1,1);
                    bef=46;
                }
                else{                              //ansonsten kann von diesem Zug an keine Falle mehr bereitet werden;
                    randomBesetzen();              //es wird ein random Feld besetzt;
                }
            }
            if(zuege==7){
                int gefahr= erkenneGefahr();
                int Win= erkenneWin();
                if(Win==1){                         //Sieg priorisieren;
                    this.feld.besetzen(2,2);
                }else if(Win==2){
                    this.feld.besetzen(2,1);
                }else if(Win==3){
                    this.feld.besetzen(2,0);
                }else if(Win==4){
                    this.feld.besetzen(1,0);
                }else if(Win==5){
                    this.feld.besetzen(0,0);
                }else if(Win==6){
                    this.feld.besetzen(0,1);
                }else if(Win==7){
                    this.feld.besetzen(0,2);
                }else if(Win==8){
                    this.feld.besetzen(1,2);
                }else if(Win==9){
                    this.feld.besetzen(2,2);
                }else if(Win==10){
                    this.feld.besetzen(1,1);
                }else if(Win==11){
                    this.feld.besetzen(0,0);
                }else if(Win==12){
                    this.feld.besetzen(0,2);
                }else if(Win==13){
                    this.feld.besetzen(2,0);
                }else if(Win==14){
                    this.feld.besetzen(1,1);
                }else if(Win==15){
                    this.feld.besetzen(0,0);
                }else if(Win==16){
                    this.feld.besetzen(2,2);
                }else if(Win==17){
                    this.feld.besetzen(2,0);
                }else if(Win==18){
                    this.feld.besetzen(0,2);
                }else if(Win==19){
                    this.feld.besetzen(1,1);
                }else if(Win==20){
                    this.feld.besetzen(1,1);
                }else if(Win==21){
                    this.feld.besetzen(0,1);
                }else if(Win==22){
                    this.feld.besetzen(2,1);
                }else if(Win==23){
                    this.feld.besetzen(1,0);
                }
                else if(gefahr==1){                     //verhindern zu verlieren;
                    this.feld.besetzen(2,2);
                }else if(gefahr==2){
                    this.feld.besetzen(2,1);
                }else if(gefahr==3){
                    this.feld.besetzen(2,0);
                }else if(gefahr==4){
                    this.feld.besetzen(1,0);
                }else if(gefahr==5){
                    this.feld.besetzen(0,0);
                }else if(gefahr==6){
                    this.feld.besetzen(0,1);
                }else if(gefahr==7){
                    this.feld.besetzen(0,2);
                }else if(gefahr==8){
                    this.feld.besetzen(1,2);
                }else if(gefahr==9){
                    this.feld.besetzen(2,2);
                }else if(gefahr==10){
                    this.feld.besetzen(1,1);
                }else if(gefahr==11){
                    this.feld.besetzen(0,0);
                }else if(gefahr==12){
                    this.feld.besetzen(0,2);
                }else if(gefahr==13){
                    this.feld.besetzen(2,0);
                }else if(gefahr==14){
                    this.feld.besetzen(1,1);
                }else if(gefahr==15){
                    this.feld.besetzen(0,0);
                }else if(gefahr==16){
                    this.feld.besetzen(2,2);
                }else if(gefahr==17){
                    this.feld.besetzen(2,0);
                }else if(gefahr==18){
                    this.feld.besetzen(0,2);
                }else if(gefahr==19){
                    this.feld.besetzen(1,1);
                }else if(gefahr==20){
                    this.feld.besetzen(1,1);
                }else if(gefahr==21){
                    this.feld.besetzen(0,1);
                }else if(gefahr==22){
                    this.feld.besetzen(2,1);
                }else if(gefahr==23){
                    this.feld.besetzen(1,0);
                }else if(gefahr==24){
                    this.feld.besetzen(1,2);
                }else{
                    randomBesetzen();               //random Feld besetzen;
                }

            }

        }

        private int erkenneGefahr(){
            int gefahr=0;
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

        private int erkenneWin(){
            int Win=0;
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
    }
}
