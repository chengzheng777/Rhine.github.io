var board = new Array(),
    score = 0,
    hasConflicted = new Array(),
    startx = 0,
    starty = 0,
    endx = 0,
    endy = 0;



$(document).ready(function(){
    prepareForMobile();
    newgame();
})

function prepareForMobile(){

    if(documentWidth > 500 ){
        gridContainerWidth =500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
    //初始化棋盘格
    init();
   
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for( var i = 0 ; i < 4 ; i ++ )
        for(var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }


    for(var i = 0 ; i<4 ; i ++ ){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0 ; j < 4 ; j++)
            board[i][j] = 0;
            hasConflicted[i][j] = false;
    }

    updateBoardView();

    score = 0;
}

function updateBoardView(){

    $(".number-cell").remove();
    for(var i = 0 ; i < 4 ; i++ )
        for(var j = 0 ; j < 4 ; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"> </div>')
            var theNumberCell = $('#number-cell-' +i+ '-' +j);

            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2 );
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2 );
            }
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ));
                theNumberCell.css('color',getNumberColor( board[i][j] ));
                theNumberCell.text( board[i][j] );
            }

            hasConflicted[i][j] = false;
        }
    
    $('.number-cell').css('line-height',cellSideLength+'px')
    $('.number-cell').css('font-size',0.6*cellSideLength+'px')
}

function generateOneNumber(){

    if( nospace( board ))
        return false;
    
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0 ;
    while( times < 50 ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times ++;
    }
    if( times == 50 ){
        for( i = 0 ; i < 4 ; i++ )
            for( j = 0 ; j < 4 ; j++ ){
                if( board[i][j] == 0 ){
                    randx = i;
                    randx = j;
                }
            }
    }
    
    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 :4;
   
    //在随机位子显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );

    return true;
}

$(document).keydown(function( event ){
    switch(event.keyCode){
        case 37: //left
            event.preventDefault();
            if( moveLeft() ){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            break;
        case 38: //up
            event.preventDefault();
            if( moveUp() ){
                setTimeout('generateOneNumber()',210);
                setTimeout(' isgameover()',300);
            }
            break;
        case 39: //right
            event.preventDefault();
            if( moveRight() ){
                setTimeout('generateOneNumber()',210);
                setTimeout(' isgameover()',300);
            }
            break; 
        case 40: //down
            event.preventDefault();
            if( moveDown() ){
                setTimeout('generateOneNumber()',210);
                setTimeout(' isgameover()',300);
            }
            break;  
        default: //default
            break;  
    }
})

//触控监听
document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth )
        return;

    //判断是否在X方向
    if( Math.abs( deltax ) >= Math.abs( deltay ) ){

        if( deltax > 0 ){
            //move right
            if( moveRight() ){
                setTimeout('generateOneNumber()',210);
                setTimeout(' isgameover()',300);
            }
        }
        else{
            //move left
            if( moveLeft() ){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
        }
    }
    //Y
    else{

        if( deltay > 0 ){
            //move down
            if( moveDown() ){
                setTimeout('generateOneNumber()',210);
                setTimeout(' isgameover()',300);
            } 
        }
        else{
            //move up
            if( moveUp() ){
                setTimeout('generateOneNumber()',210);
                setTimeout(' isgameover()',300);
            } 
        }
    }
});





function isgameover(){
    if( nospace( board ) && nomove( board ) ){
        gameover();
    }
}

function gameover(){
    alert('GameOver!');
}

//向左移动
function moveLeft(){
    //判断能否移动
    if(!canMoveLeft( board ) ){
        return false;
    } else 
    {
    //moveLeft
    for( var i = 0 ; i < 4 ; i++ ){
        for( var j = 1 ; j < 4 ; j++ ){
            if( board[i][j] != 0 ){

                for( var k = 0 ; k < j ; k++ ){
                    if( board[i][k] == 0 &&  noBlockHorizontal(i,k,j,board) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if( board[i][k] == board[i][j] &&  noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updataScore(score);

                        hasConflicted[i][k] = true;
                    }
                }
            }
        }
        
    }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//向right移动
function moveRight(){
    //判断能否移动
    if(!canMoveRight( board ) ){
        return false;
    } else 
    {
    //moveRight
    for( var i = 0 ; i < 4 ; i++ ){
        for( var j = 2 ; j > -1 ; j-- ){
            if( board[i][j] != 0 ){

                for( var k = 3 ; k > j ; k-- ){
                    if( board[i][k] == 0 &&  noBlockHorizontal(i,j,k,board) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if( board[i][k] == board[i][j] &&  noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updataScore(score);

                        hasConflicted[i][k] = true;
                    }
                }
            }
        }
        
    }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


//向上移动
function moveUp(){
    //判断能否移动
    if(!canMoveUp( board ) ){
        return false;
    } else 
    {
    //moveUp
    for( var i = 0 ; i < 4 ; i++ ){
        for( var j = 1 ; j < 4 ; j++ ){
            if( board[j][i] != 0 ){

                for( var k = 0 ; k < j ; k++ ){
                    if( board[k][i] == 0 &&  noBlockVertical(i,k,j,board) ){
                        //move
                        showMoveAnimation( j , i , k , i );
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }else if( board[k][i] == board[j][i] &&  noBlockVertical(i,k,j,board) && !hasConflicted[k][i] ){
                        //move
                        showMoveAnimation( j , i , k , i );
                        //add
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        updataScore(score);

                        hasConflicted[k][i] = true;
                    }
                }
            }
        }
        
    }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//向下移动
function moveDown(){
    //判断能否移动
    if(!canMoveDown( board ) ){
        return false;
    } else 
    {
    //moveUp
    for( var i = 0 ; i < 4 ; i++ ){
        for( var j = 2 ; j > -1 ; j-- ){
            if( board[j][i] != 0 ){

                for( var k = 3 ; k > j ; k-- ){
                    if( board[k][i] == 0 &&  noBlockVertical(i,j,k,board) ){
                        //move
                        showMoveAnimation( j , i , k , i );
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }else if( board[k][i] == board[j][i] &&  noBlockVertical(i,j,k,board) && !hasConflicted[k][i] ){
                        //move
                        showMoveAnimation( j , i , k , i );
                        //add
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        updataScore(score);

                        hasConflicted[k][i] = true;
                    }
                }
            }
        }
        
    }
    }
    setTimeout("updateBoardView()",200);
    return true;
}