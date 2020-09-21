const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const sendFileOptions = {
    root: path.join(__dirname, 'public')
};

app.get('/', (req, res) => {
    res.sendFile('index.html' , sendFileOptions, (error) => {
        if(error){
            console.log('Error sending file');
            console.log(error);
        }
    });
});

app.get('/api/wisdoms', (req, res) => {
    let wisdomArray = [];
    const wisdoms = fs.readdirSync('./wisdoms');

    for(let i = 0; i < wisdoms.length; i++){
        const wisdom = require('./wisdoms/' + wisdoms[i]);
        wisdomArray.push(wisdom);
    }

    return res.send(wisdomArray);
});

app.get('/api/wisdoms/:id', (req, res) => {
    const id = req.params.id;
    const wisdom = require('./wisdoms/' + id);
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