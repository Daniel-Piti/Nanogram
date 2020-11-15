

function createMartix(size){
    matrix = new Array(size);
    for(let i = 0; i<size; i++){
        matrix[i]=new Array(size);
        for(let j = 0; j<size; j++)
            matrix[i][j] = Math.floor(Math.random() * 2);
    }
    return matrix;
}

function resetLife(){
    while(lives_item.childNodes.length > 0)
        lives_item.removeChild(lives_item.childNodes[0]);
    lives = 3;
    for(let i = 0; i < 3; i++){
        let box = document.createElement('h3');
        box.innerHTML = ' <3  ';
        lives_item.appendChild(box);
    }
}

function loadFirstLine(){
//CREATE FIRST EMPTY BOX
    let row = document.createElement('tr');
    let box = document.createElement('td');
    box.style.backgroundColor = "rgb(255, 255, 255)";
    box.className = 'blank';
    row.appendChild(box);

//First line
    for(let i = 0; i< lvl.size; i++){
        let box = document.createElement('td');
        box.innerHTML = lvl.up[i];
        box.className = 'edge';
        box.addEventListener('mouseenter', e => clicked = 0);
        row.appendChild(box);
    }
    table.appendChild(row);
}

function event_mousedown(e){
    if(e.button == 0){ //LEFT CLICK
        clicked = 1;
        e = e || window.event;
        e = e.target;
        box = document.getElementById(e.id);
        if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
            //if should b black -> right
            if (lvl.matrix[parseInt(e.id/lvl.size)][e.id%lvl.size] == 1) {
                e.style.backgroundColor = 'rgb(0,0,0)';
                cur++;
                checkPerfectLine(e.id);
                checkWin();
            }
            //if should b X -> wrong
            else {
                e.style.backgroundColor = "#ffcccc";
                lives_item.removeChild(lives_item.childNodes[0]);
                lives--;
                checkLose();
            }
        }
    }else if(e.button == 2){
        clicked = 2;
        e = e || window.event;
        e = e.target;
        box = document.getElementById(e.id);
        if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
            //if should b black -> wrong
            if (lvl.matrix[parseInt(e.id/lvl.size)][e.id%lvl.size] == 1) {
                e.style.backgroundColor = 'rgb(0,0,0)';
                cur++;
                lives_item.removeChild(lives_item.childNodes[0]);
                lives--;
                checkPerfectLine(e.id);
                if(lives == 0){
                    alert("U lost!");
                    loadGame();
                    cur = 0;
                    lives = 3;
                }
                if(cur == lvl.total){
                    alert("gg");
                    loadGame();
                    cur = 0;
                    lives = 3;
                }
            }
            //if should b X -> right
            else {
                e.style.backgroundColor = "#ffcccc";
            }
        }
    }
}

function event_mouseenter(e){
    e = e || window.event;
    e = e.target;
    if(clicked == 1){
        box = document.getElementById(e.id);
        if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
            //if should b black -> right
            if (lvl.matrix[parseInt(e.id/lvl.size)][e.id%lvl.size] == 1) {
                e.style.backgroundColor = 'rgb(0,0,0)';
                cur++;
                checkPerfectLine(e.id);
                checkWin();
            }
            //if should b X -> wrong
            else {
                e.style.backgroundColor = "#ffcccc";
                lives_item.removeChild(lives_item.childNodes[0]);
                lives--;
                checkLose();
            }
        }
    }
    else if(clicked == 2){
        box = document.getElementById(e.id);
        if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
            //if should b black -> wrong
            if (lvl.matrix[parseInt(e.id/lvl.size)][e.id%lvl.size] == 1) {
                e.style.backgroundColor = 'rgb(0,0,0)';
                cur++;
                checkPerfectLine(e.id);
                lives_item.removeChild(lives_item.childNodes[0]);
                lives--;
                checkLose();
                checkWin();
            }
            //if should b X -> right
            else
                e.style.backgroundColor = "#ffcccc";
        }
    }
}

function loadTable(){
    loadFirstLine();
    for (let i = 0; i < lvl.size; i++) {
        let row = document.createElement('tr');
        let box = document.createElement('td');
        box.className = 'edge'
        box.innerHTML =lvl.left[i];
        row.appendChild(box);
        for(let j = 0; j < lvl.size; j++){
            let box = document.createElement('td');
            box.style.backgroundColor = "rgb(255, 255, 255)";
            box.id = i*lvl.size+j;
            row.appendChild(box);
            //FIX!@#$%^&*()
            
            //right click
            box.addEventListener('contextmenu', e => { e.preventDefault(); });
            //enter
            box.addEventListener('mouseenter', e =>event_mouseenter(e));
            //left click
            box.addEventListener('mousedown', e => event_mousedown(e));
            //up
            box.addEventListener("mouseup", e => clicked = 0 );
        }
        table.appendChild(row);
    }
    setBorders();

}

function setBorders(){
    let i, j;
    for(i = lvl.size - 1; i < lvl.size*lvl.size; i+=lvl.size)
        document.getElementById(i).style.borderRight = 'solid 4px';
    for(i = lvl.size*(lvl.size-1); i < lvl.size*lvl.size; i++)
        document.getElementById(i).style.borderBottom = 'solid 4px';

    for(i = 0; i < lvl.size; i++){
        for(j = 0; j < lvl.size; j++){
            if(j%5 == 0)
                document.getElementById(i*lvl.size+j).style.borderLeft = 'solid 4px';
            if(i%5==0)
                document.getElementById(i*lvl.size+j).style.borderTop = 'solid 4px';
        }
    }
}


function checkWin(){
    if(cur == lvl.total){
        alert("gg");
        loadGame();
        cur = 0;
        lives = 3;
    }
}

function checkLose(){
    if(lives == 0){
        alert("U lost!");
        loadGame();
        cur = 0;
        lives = 3;
    }
}

function checkPerfectLine(id){
    console.log(id);
    let box = document.getElementById(id);
    let row = parseInt(id/lvl.size);
    let col = id % lvl.size;
    let counter = 0;

    for(let i = 0; i < lvl.size; i++)
        if(getComputedStyle(document.getElementById(i*lvl.size+col)).backgroundColor == "rgb(0, 0, 0)")
            counter++;
        if(counter == lvl.totalUp[col])
            fillCol(col);

    counter = 0;
    for(let i = 0; i < lvl.size; i++){
        if(getComputedStyle(document.getElementById(row*lvl.size+i)).backgroundColor == "rgb(0, 0, 0)")
            counter++;
    }
    if(counter == lvl.totalLeft[row])
        fillRow(row);
}

function fillCol(col){
    for(let i = 0; i < lvl.size; i++)
        if(lvl.matrix[i][col] == 0)
            document.getElementById(col+i*lvl.size).style.backgroundColor = '#ffcccc';    
}

function fillRow(row){
    for(let i = 0; i < lvl.size; i++)
        if(lvl.matrix[row][i] == 0)
            document.getElementById(row*lvl.size + i).style.backgroundColor = '#ffcccc';
}