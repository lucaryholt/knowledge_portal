const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const wisdoms = sortWisdoms(require('./wisdoms.json'));
const wisdomsMap = instantiateWisdomsMap();

const ip = 'localhost:8080';
const port = 8080;

function sortWisdoms(wisdoms){
    return wisdoms.sort(function (a, b){
        return a.title.localeCompare(b.title);
    });
}

function instantiateWisdomsMap(){
    let wisdomsMap = {};
    for(let i = 0; i < wisdoms.length; i++){
        wisdomsMap[wisdoms[i].id] = wisdoms[i];
    }

    return wisdomsMap;
}

app.get('/', (req, res) => {
    res.render('index', {
        ip
    });
});

app.get('/api/wisdoms', (req, res) => {
    if(wisdoms.lenght === 0){
        return res.status(404).send({ error: 'No wisdoms. Come back later.' });
    }
    return res.status(200).send(wisdoms);
});

app.get('/api/wisdoms/:id', (req, res) => {
    const id = req.params.id;
    const wisdom = wisdomsMap[id];

    if(wisdom === undefined){
        return res.status(404).send({ error: 'No wisdom with that id.' });
    }
    return res.send(wisdom);
});

app.listen(port, (error) => {
    if(error){
        console.log(error);
        console.log('Error starting server.');
    } else {
        console.log('Server started on port', port);
    }
});