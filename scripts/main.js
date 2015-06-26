    /**************************

            VARIABLES

    **************************/
    
    
    var currentPlayer = "player1";
    var opponentPlayer = "player2";
    
    var golan; // JS table game

    var size; // size of the golan and the JS table game

    var allGroup = new Array();
    
    var vSuicide = false;
    
    var currentGroup = new Array(); // a table with numero of group to escape to the repetition of instructions.
    
    var turn = 0;
    
    var cptBlack = 0;
    var cptWhite = 0;

    
    var millisecond = 0;
    var second = 0; 
    var minute = 0;
    
    var secDown = 0;
    var minDown = 3;
    
    var havePassed = false;
    
    var vModeIA = false;



$(document).ready(function(){

 /*******************************
    
    
                TOOLS
    
    
    *******************************/
    
    
    /*****************************

    FUNCTION TO ALTERNATE PLAYERS 

    ******************************/

    function changePlayer()
    {
        if(currentPlayer=="player1")
        {
            currentPlayer="player2";
            opponentPlayer = "player1";
        }
        else if(currentPlayer=="player2")
        {
            currentPlayer="player1";
            opponentPlayer = "player2";
        }
        console.log(currentPlayer);
        
        turn ++;
    }



    
    
    
    /******************************
    
                TIMER
    
    ******************************/
    
    function timer()
    {
        'use strict';
        
        var myTime = setTimeout(function(){
        millisecond++; 
        if (millisecond > 99)
        {
            millisecond = 0;
            second++;
            document.getElementById("seconds").innerHTML = second; 
        }    

        if (second > 59)
        {
            second = 0; 
            minute++;
            document.getElementById("minutes").innerHTML = minute; 
        }   

        document.getElementById("milliseconds").innerHTML = millisecond; 

        timer();
    }, 5);   
        
    }
    
    
    /************************
    
            COUNTDOWN
    
    ************************/
    
    function countdown()
    {
        
        'use strict';
        
        myCountdown = setTimeout(function(){
            
            if(secDown == 0)
            {
                
                secDown = 59;
                minDown --;
                
            }
            
            else
            {
                
                secDown --;  
                
            }
            
            if(secDown == 0 && minDown == 0)
            {
                
                   //victoire défaite
                
            }
            
        countdown(); 
            
        }, 10);
        
    }
    
 
    /******************************
    
                MODE IA
    
    ******************************/
    
    function modeIA()
    {
        
        'use strict';
        
        vModeIA = true;
        
    }
    

    /*******************************
    
            FUNCTION TO PASS
    
    ********************************/
    
    function pass()
    {
        
        'use strict';
        
        console.log("entrée dans la fonction pass");
        
        if(havePassed == false)
        {
            
            havePassed == true;   
            
        }
        
        else
        {
            
            if(cptBlack > cptWhite)
            {
                
                window.alert("Victoire Black");
                
            }
            
            else if(cptBlack < cptWhite)
            {
                
                window.alert("Victoire White");  
                
            }
            
            
        }
        
    }
    
    
/********************************


        GAME'S PROGRESS  


*********************************/

    function Game(){

        $('.case').on( "click", function() {

            'use strict';
            
            /*****************************
            
                        MUSIC

            *****************************/
            
            /*var audio = document.getElementById('music');
            document.getElementById('soundon').addEventListener('click', function (e){
            e = e || window.event;
            audio.muted = !audio.muted;
            e.preventDefault();
            }, false);*/
            console.log("turn : " + turn);
            if(modeIA == true && currentPlayer == "player2")
            {
                console.log("entrée fonction ia");
                artificialIntelligence();
            
            }
            
            else
            {
                var currentX = parseInt(($(this).attr('id').split("_"))[1]); //coordinated X to the current emplacement selected 
                var currentY = parseInt(($(this).attr('id').split("_"))[0]); //coordinated Y to the current emplacement selected 
            
                if(golan[currentY][currentX][0] == currentPlayer || golan[currentY][currentX][0] == opponentPlayer)
                {
             
                    //the user can't click on the same position
                    console.log("occupé");
                    return false;
                
                }
            
                golan[currentY][currentX] = new Array(3);
                golan[currentY][currentX][0] = currentPlayer;
                golan[currentY][currentX][2] = "";

                var currentFreeDeg = counterFreeDeg(currentX, currentY);
             
                if(currentFreeDeg == false)
                {
                    golan[currentY][currentX] = false; 
                    return false;
                }
    
                golan[currentY][currentX][1] = currentFreeDeg;

                console.log("i = " + currentY + " j = " + currentX + " nbrFreeDeg = " + currentFreeDeg);
    
                $(this).addClass(currentPlayer);
                    
            }
            changePlayer();

        });
    }

    /****************************************


                INITIALISATION


    ****************************************/


    /*****************************************

    FUNCTION TO CREATE THE GRID GAME HTML & JS

    ******************************************/

    function createGolan()
    {
        'use strict';

        $('#background').append("<div id='golan'></div>");
        $("#golan").css({
            width:size * 30,
            height:size * 30
        });

        golan = new Array(size);

        for(var i = 0; i < size; i++)
        {
            golan[i] = new Array(size);

            for(var j = 0; j < size; j++)
            {
                
                var specialClass = "";
			
			 if(i == 0 && j == 0){specialClass = "topLeft";}

			 else if(i == 0 && j == size-1){specialClass = "topRight";}

			 else if(i == 0 ){specialClass = "sideTop";}

			 else if(i == size-1 && j == 0){specialClass = "bottomLeft";}

			 else if(i == size-1 && j == size-1){specialClass = "bottomRight";}

			 else if(j ==  0 && i != size-1){specialClass = "sideLeft";}

			 else if(j == size-1){specialClass = "sideRight";}

			 else if(i == size-1){specialClass = "sideBottom";}

			 else {specialClass = "center";}
                
                golan[i][j] = false;
                $("#golan").append("<div class='case " + specialClass + "'' id=" + i + '_' + j + ">    </div>");
            }
        }

        Game();
    }

    /****************************************


                VERIFICATION


    ****************************************/


    function counterFreeDeg(posX, posY)
    {

        'use strict';

        var nbrFreeDeg = 0;

        switch(posX)
        {

            case 0 :

                switch(posY)
                {

                    case 0 :

                        if((golan[posY][posX+1][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY+1][posX][0] == currentPlayer))
                        {
                         
                            suicide = true;
                            
                            vSuicide = suicide(posX, posY, posX+1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX, posY+1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = false;
                            currentGroup = false;
                            currentGroup = new Array();
                            
                        }
                        
                        
                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX+1, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY+1, posX, nbrFreeDeg);

                        if(golan[posY][posX][2] == ""){

                            golan[posY][posX][2] = newGroupPieces();
                            allGroup[allGroup.length - 1][1] = posY + "_" + posX;

                        }
                        

                        break;

                    case size-1 :
                        
                        if((golan[posY-1][posX][0] == opponentPlayer && golan[posY][posX+1][0] == opponentPlayer) ||
                          (golan[posY-1][posX][0] == currentPlayer && golan[posY][posX+1][0] == opponentPlayer) ||
                          (golan[posY-1][posX][0] == opponentPlayer && golan[posY][posX+1][0] == currentPlayer))
                        {
                         
                            vSuicide = true;
                            
                            vSuicide = suicide(posX, posY, posX, posY-1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX+1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = false;
                            currentGroup = false;
                            currentGroup = new Array();
                            
                        }

                        nbrFreeDeg = testNextPiece(posX, posY, posY-1, posX, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX+1, nbrFreeDeg);

                        if(golan[posY][posX][2] == ""){

                            golan[posY][posX][2] = newGroupPieces();
                            allGroup[allGroup.length - 1][1] = posY + "_" + posX;

                        }

                        break;

                    default :

                        
                        if((golan[posY][posX+1][0] == opponentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY-1][posX][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == currentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY-1][posX][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY-1][posX][0] == currentPlayer && golan[posY+1][posX][0] == currentPlayer))
                        {
                         
                            vSuicide = true;
                            
                            vSuicide = suicide(posX, posY, posX+1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX, posY-1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX, posY+1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = false;
                            currentGroup = false;
                            currentGroup = new Array();
                            
                        }
                        
                        nbrFreeDeg = testNextPiece(posX, posY, posY-1, posX, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX+1, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY+1, posX, nbrFreeDeg);

                        if(golan[posY][posX][2] == ""){

                            golan[posY][posX][2] = newGroupPieces();
                            allGroup[allGroup.length - 1][1] = posY + "_" + posX;

                        }


                }

                break;


            case size-1 :

                switch(posY)
                {


                    case 0 :
                        
                        if((golan[posY+1][posX][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer) ||
                          (golan[posY+1][posX][0] == currentPlayer && golan[posY][posX-1][0] == opponentPlayer) ||
                          (golan[posY+1][posX][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer))
                        {
                         
                            vSuicide = true;
                            
                            vSuicide = suicide(posX, posY, posX, posY+1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX-1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = false;
                            currentGroup = false;
                            currentGroup = new Array();
                            
                        }

                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX-1, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY+1, posX, nbrFreeDeg);

                        if(golan[posY][posX][2] == ""){

                            golan[posY][posX][2] = newGroupPieces();
                            allGroup[allGroup.length - 1][1] = posY + "_" + posX;

                        }
                        

                        break;

                    case size-1 :

                        
                        if((golan[posY-1][posX][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer) ||
                          (golan[posY-1][posX][0] == currentPlayer && golan[posY][posX-1][0] == opponentPlayer) ||
                          (golan[posY-1][posX][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer))
                        {
                         
                            vSuicide = true;
                            
                            vSuicide = suicide(posX, posY, posX, posY-1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX-1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = false;
                            currentGroup = false;
                            currentGroup = new Array();
                            
                        }
                        
                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX-1, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY-1, posX, nbrFreeDeg);

                        if(golan[posY][posX][2] == ""){

                            golan[posY][posX][2] = newGroupPieces();
                            allGroup[allGroup.length - 1][1] = posY + "_" + posX;

                        }

                        break;

                    default :

                        if((golan[posY-1][posX][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY-1][posX][0] == currentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY-1][posX][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY-1][posX][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY+1][posX][0] == currentPlayer) ||
                          (golan[posY-1][posX][0] == currentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY-1][posX][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY+1][posX][0] == currentPlayer))
                        {
                         
                            vSuicide = true;
                            
                            vSuicide = suicide(posX, posY, posX, posY-1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX-1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX, posY+1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = false;
                            currentGroup = false;
                            currentGroup = new Array();
                            
                        }
                        
                        nbrFreeDeg = testNextPiece(posX, posY, posY+1, posX, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX-1, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY-1, posX, nbrFreeDeg);

                        if(golan[posY][posX][2] == ""){

                            golan[posY][posX][2] = newGroupPieces();
                            allGroup[allGroup.length - 1][1] = posY + "_" + posX;

                        }
                        
                }

                break;


            default :

                switch(posY)
                {


                    case 0 :
                        
                        if((golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY+1][posX][0] == currentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY+1][posX][0] == currentPlayer))
                        {
                         
                            vSuicide = true;
                            
                            vSuicide = suicide(posX, posY, posX+1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX-1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX, posY+1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = false;
                            currentGroup = false;
                            currentGroup = new Array();
                            
                        }

                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX+1, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY+1, posX, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX-1, nbrFreeDeg);

                        if(golan[posY][posX][2] == ""){

                            golan[posY][posX][2] = newGroupPieces();
                            allGroup[allGroup.length - 1][1] = posY + "_" + posX;

                        }
                        

                        break;

                    case size-1 :
                        
                        if((golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY-1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == currentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY-1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY-1][posX][0] == currentPlayer))
                        {
                         
                            vSuicide = true;
                            
                           vSsuicide = suicide(posX, posY, posX+1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX-1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX, posY-1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = false;
                            currentGroup = false;
                            currentGroup = new Array();
                            
                        }

                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX-1, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY-1, posX, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX+1, nbrFreeDeg);

                        if(golan[posY][posX][2] == ""){

                            golan[posY][posX][2] = newGroupPieces();
                            allGroup[allGroup.length - 1][1] = posY + "_" + posX;

                        }
                        

                        break;

                    default :

                        if((golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == currentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == currentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == currentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY-1][posX][0] == currentPlayer && golan[posY+1][posX][0] == opponentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == currentPlayer && golan[posY-1][posX][0] == opponentPlayer && golan[posY+1][posX][0] == currentPlayer) ||
                          (golan[posY][posX+1][0] == opponentPlayer && golan[posY][posX-1][0] == opponentPlayer && golan[posY-1][posX][0] == currentPlayer && golan[posY+1][posX][0] == currentPlayer))
                        {
                         
                            vSuicide = true;
                            
                            vSuicide = suicide(posX, posY, posX+1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX-1, posY);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX, posY-1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = suicide(posX, posY, posX, posY+1);
                            if(vSuicide == false){return false;}
                            
                            vSuicide = false;
                            currentGroup = false;
                            currentGroup = new Array();
                            
                        }
                        
                        nbrFreeDeg = testNextPiece(posX, posY, posY-1, posX, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX+1, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY+1, posX, nbrFreeDeg);
                        nbrFreeDeg = testNextPiece(posX, posY, posY, posX-1, nbrFreeDeg);

                        if(golan[posY][posX][2] == ""){

                            golan[posY][posX][2] = newGroupPieces();
                            allGroup[allGroup.length - 1][1] = posY + "_" + posX;

                        }
                        
                }

        }

        return nbrFreeDeg

    }



    /*********************************

    FUNCTION TO TEST THE NEXT PIECE

    **********************************/

    function testNextPiece(posX, posY, posA, posB, nbrFreeDeg)
    {

        'use strict';

        if(golan[posA][posB] == false)
        {

            nbrFreeDeg++;
            return nbrFreeDeg;

        } //if the position is empty


        else if(golan[posA][posB][0] == currentPlayer)
        {

            changeFriendPiece(posX, posY, posB, posA);



            return nbrFreeDeg;

        } //if the position is a friend's piece


        else
        {
            changeRivalPiece(posX, posY, posB, posA);
            return nbrFreeDeg;

        } //if the position is a rival's piece


    }


    /*********************************

    FUNCTION TO CHANGE FRIEND'S PIECE 

    **********************************/


    function changeFriendPiece(posX, posY, friendPosX, friendPosY)
    {

        'use strict';

        console.log("entry to the friend function");

        golan[friendPosY][friendPosX][1]--;

        if(golan[posY][posX][2] == "")
        {
            console.log("entry to the first test group");
            golan[posY][posX][2] = golan[friendPosY][friendPosX][2];

            for(var i = 0; i < allGroup.length; i++)
            {

                if(golan[friendPosY][friendPosX][2] == allGroup[i][0])
                {

                    allGroup[i][allGroup[i].length] = posY + "_" + posX;

                }

            }

        }

        else if(golan[posY][posX][2] != golan[friendPosY][friendPosX][2])
        {

            for(var i = 0; i < allGroup.length; i++)
            {

                if(golan[friendPosY][friendPosX][2] == allGroup[i][0])
                {

                    for(var j = 0; j < allGroup.length; j++)
                    {

                        if(golan[posY][posX][2] == allGroup[j][0])
                        {

                            for(var k = 1; k < allGroup[i].length; k++)
                            {

                                var X = parseInt((allGroup[i][k].split("_"))[1]);

                                var Y = parseInt((allGroup[i][k].split("_"))[0]);

                                allGroup[j][allGroup[j].length] = allGroup[i][k];

                                golan[Y][X][2] = allGroup[j][0];

                            }

                            allGroup.splice(i, 1);

                        }  

                    }
                }
            }

        }

        console.log(allGroup);

    }


    /*********************************

    FUNCTION TO CHANGE RIVAL'S PIECE 

    **********************************/


    function changeRivalPiece(posX, posY, rivalPosX, rivalPosY)
    {

        'use strict';

        console.log("entry to the rival function");

        var death = true;

        golan[rivalPosY][rivalPosX][1]--;
        
        for(var i = 0; i < allGroup.length; i++)
        {

            if(golan[rivalPosY][rivalPosX][2] == allGroup[i][0])
            {
                console.log("entry to the test of rival's group"); //test each token of the rival's group
                for(var k = 1; k < allGroup[i].length; k++)
                {

                    var X = parseInt((allGroup[i][k].split("_"))[1]);

                    var Y = parseInt((allGroup[i][k].split("_"))[0]);

                    if(golan[Y][X][1] != 0)
                    {

                        death = false;

                    }

                }

                if(death == true)
                {

                    console.log("DEATH");
                    
                    if(currentPlayer == "player1")
                    {
                        
                        cptBlack += k - 1;
                        console.log("cptBlack = " + cptBlack);                       
                    }
                    
                    else
                    {
                        
                        cptWhite += k - 1;
                        console.log("cptWhite = " + cptWhite);
                        
                    }

                    for(var k = 1; k < allGroup[i].length; k++)
                    {

                        var X = parseInt((allGroup[i][k].split("_"))[1]);

                        var Y = parseInt((allGroup[i][k].split("_"))[0]);

                        golan[Y][X] = false;

                        //console.log(document.getElementById(Y + "_" + X));
                        document.getElementById(Y + "_" + X).classList.remove(opponentPlayer);

                    }

                    allGroup.splice(i, 1);

                }

            }

        }



    }

    
    
    
    /***************************************

        FUNCTION TO EVALUATE THE SUICIDE 

    ****************************************/ 
    
    
    function suicide(posX, posY, rivalPosX, rivalPosY)
    {
        
        'use strict';
        
        console.log("entry to the rival function");
        
        var death = true;
        
        /*
        for(var i = 0; i < currentGroup.length; i++)
        {
            
            if(golan[rivalPosY][rivalPosX][2] == currentGroup[i]){return false;}
            
        }*/
        
        for(var i = 0; i < allGroup.length; i++)
        {

            if(golan[rivalPosY][rivalPosX][2] == allGroup[i][0])
            {
                console.log("entry to the test of rival's group / suicide mode"); //test each token of the rival's group
                
                currentGroup[currentGroup.length] = allGroup[i][0];
                
                for(var k = 1; k < allGroup[i].length; k++)
                {

                    var X = parseInt((allGroup[i][k].split("_"))[1]);

                    var Y = parseInt((allGroup[i][k].split("_"))[0]);

                    if(golan[Y][X][1] != 0)
                    {

                        console.log("suicide -> impossibilité de jouer");
                        return false;

                    }

                }
                
                
                console.log("DEATH");

                for(var k = 1; k < allGroup[i].length; k++)
                {

                    var X = parseInt((allGroup[i][k].split("_"))[1]);

                    var Y = parseInt((allGroup[i][k].split("_"))[0]);

                    golan[Y][X] = false;

                    //console.log(document.getElementById(Y + "_" + X));
                    document.getElementById(Y + "_" + X).classList.remove(opponentPlayer);

                }

                allGroup.splice(i, 1);

                
            }
        }
        
    }
    
    
    

    /***************************************

    FUNCTION TO CREATE A NEW GROUP OF PIECES 

    ****************************************/


    function newGroupPieces()
    {

        'use strict';

        var x = allGroup.length;

        allGroup[allGroup.length] = new Array();


        do
        {
            var counter = true;

            allGroup[x][0] = parseInt(Math.random() * (size * size) + 1);

            for(var i = 0; i < x-1; i++)
            {

                if(allGroup[x][0] == allGroup[i])
                {
                    counter = false; 
                    i = x-1;
                }  

            }

        }while(counter == false);
        
        console.log(allGroup);
        return allGroup[x][0];
    }


/*********************************
    
            RANDOM PLACEMENT
    
    *********************************/
    
    function randomPlacement()
    {
        
        'use strict';
        
        do
        {
            
            var posAleaX = parseInt(Math.random() * size);
            var posAleaY = parseInt(Math.random() * size);
            
            
            
        }while(golan[posAleaY][posAleaX][0] == opponentPlayer || golan[posAleaY][posAleaX][0] == currentPlayer)
            
        do{
            golan[posAleaY][posAleaX] = new Array(3);
            golan[posAleaY][posAleaX][0] = currentPlayer;
            golan[posAleaY][posAleaX][2] = "";

            var currentFreeDeg = counterFreeDeg(posAleaX, posAleaY);
        
            if(currentFreeDeg == false){golan[currentY][currentX] = false;}
            
        }while(currentFreeDeg == false)
            
        golan[posAleaY][posAleaX][1] = currentFreeDeg;
        
        document.getElementById(posAleaY + "_" + posAleaX).addClass(currentPlayer);
        
    }
    
    
    
        /********************************************
    
    
    
                    ARTIFICIAL INTELLIGENCE
    
    
    
        ********************************************/
    
    
    function artificialIntelligence()
    {
        
        'use strict';
        
        var a = Math.round(Math.random());
        
        if(a == 0)
        {
            
            if(cptWhite >=10)
            {
                
                var a = Math.round(Math.random());
                
                if(a == 0)
                {
            
                    randomPlacement();
            
                }
        
                else
                {
            
                    pass();
            
                }
                
            }
            
            else
            {
                
                randomPlacement();   
                
            }
            
        }
        
        else
        {
            
            
            
        }
        
    }
    /*
    
    je tire aléatoirementre 1 et 0
    
    si c'est 0 
    
    si cptWhite > 10
    
    tirage aléa 0 et 1
    
    si 1 pass
    
    si 0
    je place aléatoirement la pièce sur le plateau en retirant à chaque fois tant que la position sélectionner est prise
    
    si je tire 1 
    je tire aléatoirement un i entre 0 et la longueur de allGroup
    je regarde la nature de la première pièce du groupe si c'est un opposant je reste sinon je retire
    si c'est un opposant je tire un j aléatoirement entre 1 et la longueur de la ligne
    si la pièce tirer n'a pas de dgr de lib je retire
    sinon je tire aléatoirement un k entre 1 et le nombre de dgr de lib de la pièce
    et je place mon piont à la position de ce degré de lib
    */
    
    
    
    
   


    // ANIMATION LOGO

    $('#logo').on( "click", function() {
        $(this).addClass('anim')
        $(this).css({
            width : '150px',
            height:'150px',
            'margin-left': '45%'
        });

    });


    // FONCTION APPARITION DES BOUTTONS

    $("#logo").click(function(){

        $(".button_choice").css('opacity', '1');

    });

    $(".button_choice").click(function(){

        $(".buttons").fadeToggle(1500);
         $(".button_choice").css('opacity', '0');
       

    });
    
    $("ia").click(function(){
        
        modeIA();
        
    });
    
     $("pass").click(function(){
        
        pass();
        changePlayer()
        
    });

    
    // CHOIX DE LA TAILLE DE LA GRILLE & APPARITION DE LA GRILLE
    $("#littleGrid").click(function(){
        $(".buttons2").slideToggle(800);
        $(".buttons").slideToggle(800);
        $(".compteur").toggle(1000);
        size = 9;
        createGolan();
        timer();
        $("#ninjablack").toggle(200);

    });


    $("#mediumGrid").click(function(){
        $(".buttons2").slideToggle(800);
        $(".buttons").slideToggle(800);
        $(".compteur").toggle(1000);
        size = 13;
        createGolan();
        timer();
        $("#ninjablack").toggle(200);

    });

    $("#bigGrid").click(function(){
        $(".buttons2").slideToggle(800);
        $(".buttons").slideToggle(800);
        $(".compteur").toggle(1000);
        size = 19;
        createGolan();
        timer();
        $("#ninjablack").toggle(200);

    });

    

});



