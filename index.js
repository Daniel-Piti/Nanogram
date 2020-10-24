var lvl = lvl2;
var size = lvl.size;       //CUR ARRAY SIZE
var cur = 0;        //CUR BLACKED BOXXES
var lives = 3;      //CUR LIVES
var clicked = 0;    //CLICKED INDEX
var table = document.getElementById('game');
var lives_item = document.getElementById('lives');

function loadGame(){
    table.addEventListener('mouseenter',   e => { clicked = 0; });
    table.addEventListener('mouseup', e => { clicked = 0});
    resetLife();
    while(table.childNodes.length > 0){
        table.removeChild(table.childNodes[0]);
    }
    loadTable();
}

loadGame();