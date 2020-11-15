const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/index.css', function(req, res) {
    res.sendFile(__dirname + "/" + "index.css");
});

app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + "/" + "index.js");
});

app.get('/createLevel.js', (req, res) => {
    res.sendFile(__dirname + "/" + "createLevel.js");
});

app.get('/Levels/lvl1.json', (req, res) =>{
    res.sendFile(__dirname + '/Levels/lvl1.json');
})

app.get('/Levels/lvl2.json', (req, res) =>{
    res.sendFile(__dirname + '/Levels/lvl2.json');
})

app.get('/random_level', (req,res) =>{
    num = Math.floor(Math.random() * 2 + 1);
    console.log('Level ' + num);
    res.sendFile(__dirname+'/' + '/Levels/lvl' + num + '.json')
})

app.get('/levels.js', (req, res) => {
    res.sendFile(__dirname + "/" + "levels.js");
});



app.listen(2000, () => console.log('server started on 2K'));