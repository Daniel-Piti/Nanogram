

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
        row.appendChild(box);
    }
    table.appendChild(row);
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
            box.addEventListener('mouseenter', e => {
                e = e || window.event;
                e = e.target;
                if(clicked == 1){
                    if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
                        //if should b black -> right
                        if (lvl.matrix[parseInt(e.id/lvl.size)][e.id%lvl.size] == 1) {
                            e.style.backgroundColor = 'rgb(0,0,0)';
                            cur++;
                            checkPerfectLine(e.id);
                            if(cur == lvl.total){
                                alert("gg");
                                loadGame();
                                cur = 0;
                                lives = 3;
                            }
                        }
                        //if should b X -> wrong
                        else {
                            e.style.backgroundColor = "#ffcccc";
                            lives_item.removeChild(lives_item.childNodes[0]);
                            lives--;
                            if(lives == 0){
                                alert("U lost!");
                                loadGame();
                                cur = 0;
                                lives = 3;
                            }
                        }
                    }
                }
                else if(clicked == 2){
                    if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
                        //if should b black -> wrong
                        if (lvl.matrix[parseInt(e.id/lvl.size)][e.id%lvl.size] == 1) {
                            e.style.backgroundColor = 'rgb(0,0,0)';
                            cur++;
                            checkPerfectLine(e.id);
                            lives_item.removeChild(lives_item.childNodes[0]);
                            lives--;
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
            });
            //left click
            box.addEventListener('mousedown', e => {
                if(e.button == 0){
                    clicked = 1;
                    e = e || window.event;
                    e = e.target;
                    if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
                        //if should b black -> right
                        if (lvl.matrix[parseInt(e.id/lvl.size)][e.id%lvl.size] == 1) {
                            e.style.backgroundColor = 'rgb(0,0,0)';
                            cur++;
                            checkPerfectLine(e.id);
                            if(cur == lvl.total){
                                alert("gg");
                                loadGame();
                                cur = 0;
                                lives = 3;
                            }
                        }
                        //if should b X -> wrong
                        else {
                            e.style.backgroundColor = "#ffcccc";
                            lives_item.removeChild(lives_item.childNodes[0]);
                            lives--;
                            if(lives == 0){
                                alert("U lost!");
                                loadGame();
                                cur = 0;
                                lives = 3;
                            }
                        }
                    }
                }else if(e.button == 2){
                    e = e || window.event;
                    e = e.target;
                    clicked = 2;
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

            });
            //up
            box.addEventListener("mouseup", function(e) { clicked = 0; });
        }
        table.appendChild(row);
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