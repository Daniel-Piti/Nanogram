console.log("usha");

var size = 4;

var ans = [
    [0, 1, 1, 1],
    [1, 1, 0, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 0]
];

var table = document.getElementById('game');

var clicked = 1;

for (let i = 0; i < size; i++) {
    let row = document.createElement('tr');
    for(let j = 0; j < size; j++){
        let box = document.createElement('td');
        box.style.backgroundColor = "rgb(255, 255, 255)";
        box.id = i*4+j;
        table.appendChild(row);
        row.appendChild(box);
        box.addEventListener('mousedown', (e) => {
            e = e || window.event;
            e = e.target;
            if(clicked){
                if(getComputedStyle(box).backgroundColor == "rgb(255, 255, 255)") {
                    console.log(parseInt(e.id/size), e.id%size);
                    if(ans[parseInt(e.id/size)][e.id%size] == 1)     
                        e.style.backgroundColor = "#000000";
                    else
                        e.style.backgroundColor = "#ffcccc";
                }
            }
        });

    }
}