var total_Levels = 2;
var lvl;
var size;;          //CUR ARRAY SIZE
var cur = 0;        //CUR BLACKED BOXXES
var lives = 3;      //CUR LIVES
var clicked = 0;    //CLICKED INDEX
var table = document.getElementById('game');
var lives_item = document.getElementById('lives');

table.addEventListener('mouseenter', () => clicked = 0);

function loadGame(){
    cur = 0;
    size = lvl.size;
    resetLife();
    while(table.childNodes.length > 0){
        table.removeChild(table.childNodes[0]);
    }
    loadTable();
}

var temp = document.getElementById('temp');

temp.addEventListener('click', () => get_Level())

function get_Level(){
    fetch('random_level')
    .then(res => {return res.json()})
    .then(data => { console.log(data);
        lvl = JSON.parse(JSON.stringify(data));
        loadGame();
    })
}