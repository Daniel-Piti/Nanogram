var size = 4;       //CUR ARRAY SIZE
var cur = 0;        //CUR BLACKED BOXXES
var lives = 3;      //CUR LIVES
var clicked = 0;    //CLICKED INDEX
var lives_item = document.getElementById('lives'); //LIVES ELEMENT ---------------------------
var table = document.getElementById('game');

resetLife();
loadMouseEvents();
loadTable();        //CREATE GAME TABLE