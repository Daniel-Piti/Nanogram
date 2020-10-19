var size = 4;

var lvl1 = {
    left   : [[3],[2],[1,1],[2]],
    up     : [[1,1],[4],[1],[1,1]],
    matrix : [[0, 1, 1, 1],
              [1, 1, 0, 0],
              [0, 1, 0, 1],
              [1, 1, 0, 0]],
    total  : 9
}
//ANSWER EXAMPLE
var ans = [
    [0, 1, 1, 1],
    [1, 1, 0, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 0]
];
var cur = 0;
var lives = 3;
var lives_item = document.getElementById('lives');
for(let i = 0; i < 3; i++){
    let box = document.createElement('h3');
    box.innerHTML = ' <3  ';
    box.id = 100;
    lives_item.appendChild(box);
}

var table = document.getElementById('game');
table.addEventListener('mouseenter',   e => { clicked = 0; });

document.addEventListener('mousedown', e => { clicked = 1; });
document.addEventListener('mouseup',   e => { clicked = 0; });

//CLICKED INDEX
var clicked = 0;
//CREATE GAME TABLE

let row = document.createElement('tr');

let box = document.createElement('td');
box.style.backgroundColor = "rgb(255, 255, 255)";
row.appendChild(box);

for(let i = 0; i< size; i++){
    let box = document.createElement('td');
    box.innerHTML =lvl1.up[i];
    box.style.backgroundColor = "rgb(255, 255, 255)";
    row.appendChild(box);
}
table.appendChild(row);

for (let i = 0; i < size; i++) {
    let row = document.createElement('tr');
    let box = document.createElement('td');
    box.style.backgroundColor = "rgb(255, 255, 255)";
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
            if(clicked)
                if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
                    console.log(parseInt(e.id/size), e.id%size);
                    if (ans[parseInt(e.id/size)][e.id%size] == 1) {  
                        e.style.backgroundColor = "#000000";
                        cur++;
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
                    if (ans[parseInt(e.id/size)][e.id%size] == 1) {    
                        e.style.backgroundColor = "#000000";
                        cur++;
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