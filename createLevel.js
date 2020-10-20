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
    box.classList = 'blank';
    row.appendChild(box);

//First line
    for(let i = 0; i< size; i++){
        let box = document.createElement('td');
        box.innerHTML =lvl1.up[i];
        box.className = 'edge'
        row.appendChild(box);
    }
    table.appendChild(row);
}

function loadTable(){
    loadFirstLine();
    for (let i = 0; i < size; i++) {
        let row = document.createElement('tr');
        let box = document.createElement('td');
        box.className = 'edge'
        box.innerHTML =lvl1.left[i];
        row.appendChild(box);
        for(let j = 0; j < size; j++){
            let box = document.createElement('td');
            box.style.backgroundColor = "rgb(255, 255, 255)";
            box.id = i*4+j;
            row.appendChild(box);
    
            box.addEventListener('mousedown', e => {
                e = e || window.event;
                e = e.target;
                if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
                    console.log(parseInt(e.id/size), e.id%size);
                    if (lvl1.matrix[parseInt(e.id/size)][e.id%size] == 1) {  
                        e.style.backgroundColor = "#000000";
                        cur++;
                        checkPerfectLine(e.id);
                        if(cur == 9)
                            alert("gg");
                    }
                    else {
                        e.style.backgroundColor = "#ffcccc";
                        lives_item.removeChild(lives_item.childNodes[0]);
                        lives--;
                        if(lives == 0)
                            alert("U lost!");
                    }
                }
            });
    
            box.addEventListener('mousemove', e => {
                e = e || window.event;
                e = e.target;
                if(clicked)
                    if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
                        console.log(parseInt(e.id/size), e.id%size);
                        if (lvl1.matrix[parseInt(e.id/size)][e.id%size] == 1) {    
                            e.style.backgroundColor = "#000000";
                            cur++;
                            checkPerfectLine(e.id);
                            if(cur == 9)
                                alert("gg");
                        }
                        else {
                            e.style.backgroundColor = "#ffcccc";
                            lives_item.removeChild(lives_item.childNodes[0]);
                            lives--;
                            if(lives == 0)
                                alert("U lost!");
                        }
                    }
                });
        }
        table.appendChild(row);
    }
    
}

function loadMouseEvents(){
    table.addEventListener('mouseenter',   e => { clicked = 0; });
    document.addEventListener('mousedown', e => { clicked = 1; });
    document.addEventListener('mouseup',   e => { clicked = 0; });

}

function checkPerfectLine(id){
    let box = document.getElementById(id);
    let row = parseInt(id/size);
    let col = id % size;
    let counter = 0;

    for(let i = 0; i < size; i++)
        if(getComputedStyle(document.getElementById(i*size+col)).backgroundColor == "rgb(0, 0, 0)")
            counter++;
    if(counter == lvl1.totalUp[col])
        fillCol(col);

    counter = 0;
    for(let i = 0; i < size; i++){
        if(getComputedStyle(document.getElementById(row*size+i)).backgroundColor == "rgb(0, 0, 0)")
            counter++;
    }
    if(counter == lvl1.totalLeft[row])
        fillRow(row);
}

function fillCol(col){
    for(let i = 0; i < size; i++){
        if(lvl1.matrix[i][col] == 1)
            document.getElementById(col+i*size).style.backgroundColor = "rgb(0, 0, 0)";
        else
            document.getElementById(col+i*size).style.backgroundColor = '#ffcccc';
    }         
}

function fillRow(row){
    for(let i = 0; i < size; i++){
        if(lvl1.matrix[row][i] == 1)
            document.getElementById(row*size + i).style.backgroundColor = "rgb(0, 0, 0)";
        else
            document.getElementById(row*size + i).style.backgroundColor = '#ffcccc';
    }  
}