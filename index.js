var lvl;
var size;;       //CUR ARRAY SIZE
var cur = 0;        //CUR BLACKED BOXXES
var lives = 3;      //CUR LIVES
var clicked = 0;    //CLICKED INDEX
var table = document.getElementById('game');
var lives_item = document.getElementById('lives');

function loadGame(){
    resetLife();
    while(table.childNodes.length > 0){
        table.removeChild(table.childNodes[0]);
    }
    loadTable();
}

var btn1 = document.createElement('button');
var btn2 = document.createElement('button');
btn1.innerHTML = 'Level 1';
btn2.innerHTML = 'level 2';
document.body.appendChild(btn1);
document.body.appendChild(btn2);
btn1.onclick = () => {cur = 0; lvl = lvl1; size=lvl1.size; loadGame();}
btn2.onclick = () => {cur = 0; lvl = lvl2; size=lvl2.size; loadGame();}