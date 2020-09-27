const board = document.querySelector('#board');

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const square=document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-col',`${j}`);
        square.setAttribute('data-row',`${i}`);
        board.appendChild(square);
    }    
}