const board = document.querySelector('#board');
const result=document.querySelector('#result');

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const square=document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-col',`${j}`);
        square.setAttribute('data-row',`${i}`);
        board.appendChild(square);
    }    
}

const Board = function (player1,player2){
    const boardGame = {};
    let boxesMarked = [];
    let players=[player1,player2];
    boardGame.mark = function (row, col){
        //console.log(boxesMarked.includes({row:row,col:col}));
        let cond= boxesMarked.filter( box => {
           return (box.row == row && box.col ==col) 
        })
        let player = players.filter(player=>{
            return player.turn 
        })[0];
        
        if (!cond.length){
            let mark='';
            boxesMarked.push({row,col});
            player.markBox({row,col});
            const icon = document.createElement('i');
            player.mark=='x' ? mark='fa fa-close':mark ='fa fa-circle-o';
            icon.setAttribute('class',mark);
            this.appendChild(icon);
            players[0].passTurn();
            players[1].passTurn();
            
            if(win(player)){
                result.textContent=`${player.name} Wins`;
                
            }
           
        }
    }
    boardGame.getBoxesMarked = function(){
        return boxesMarked;
    } 
    return boardGame;
}

const Player = function(name,mark,turn){
    const player = {};
    player.name=name
    player.turn=turn
    player.mark=mark;
    let boxesUsed=[];
    player.passTurn = function(){
        player.turn= !player.turn;
    }
    player.getBoxes = function(){
        return boxesUsed;
    }
    player.markBox = function(box){
        boxesUsed.push(box);
    }
    return player;
}
const play1=Player("Ro",'x',true);
const play2=Player('Gabo','o',false);
const newBoard =  Board(play1,play2);
//newBoard.mark(1,2);
//newBoard.mark(2,2);
console.log(newBoard.getBoxesMarked());

function win(player){
    let cond = false;
    let rows = Object.values(player.getBoxes().reduce((obj,items)=>{
        if(!(items.row in obj)){
            obj[items.row]=0;
        }
        obj[items.row]++;
        return obj
    },{}));
    
    let columns = Object.values(player.getBoxes().reduce((obj,items)=>{
        if(!(items.col in obj)){
            obj[items.col]=0;
        }
        obj[items.col]++;
        return obj
    },{}));
    let revCross = player.getBoxes().filter(square =>{
        return (parseInt(square.row)+parseInt(square.col)==2);
    });
    console.log(revCross);
    let rowsAndColumns = rows.concat(columns);
    let cross = player.getBoxes().filter(box=> {
        return box.row == box.col;
    }) 
    if (cross.length >= 3){
        cond = true;
         }
    else if(revCross.length >= 3){
        cond = true;
    }
    else{
    rowsAndColumns.forEach(item => {
         if (item >=3){
             cond = true;
         };
    })}
    console.log(cond);
    return cond ;
}

const boxes = document.querySelectorAll('.square');
boxes.forEach(box => box.addEventListener('click',newBoard.mark.bind(box,box.getAttribute('data-row'),box.getAttribute('data-col'))));
