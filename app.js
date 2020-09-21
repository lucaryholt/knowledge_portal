const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const sendFileOptions = {
    root: path.join(__dirname, 'public')
};

const wisdoms = require('./wisdoms.json');
const wisdomsMap = instantiateWisdomsMap();

function instantiateWisdomsMap(){
    let wisdomsMap = {};
    for(let i = 0; i < wisdoms.wisdoms.length; i++){
        wisdomsMap[wisdoms.wisdoms[i].id] = wisdoms.wisdoms[i];
    }

    return wisdomsMap;
}

app.get('/', (req, res) => {
    res.sendFile('index.html' , sendFileOptions, (error) => {
        if(error){
            console.log('Error sending index file.');
            console.log(error);
        }
    });
});

app.get('/api/wisdoms', (req, res) => {
    if(wisdoms.wisdoms.length === 0){
        return res.status(404).send({ error: 'No wisdoms. Come back later.' });
    }
    return res.status(200).send(wisdoms.wisdoms);
});

app.get('/api/wisdoms/:id', (req, res) => {
    const id = req.params.id;
    const wisdom = wisdomsMap[id];

    if(wisdom === undefined){
        return res.status(404).send({ error: 'No wisdom with that id.' });
    }
    return res.send(wisdom);
});

app.listen(8080, (error) => {
    if(error){
        console.log(error);
        console.log('Error starting server.');
    } else {
        console.log('Server started on port', 8080);
    }
});