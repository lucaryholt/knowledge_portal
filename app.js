const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

const sendFileOptions = { root: publicPath };
const wisdoms = sortWisdoms(require('./wisdoms/wisdoms.json'));
const wisdomsMap = makeWisdomsMap();

const ip = 'localhost:8080';
const port = 8080;

function sortWisdoms(wisdoms){
    return wisdoms.sort(function (a, b){
        return a.title.localeCompare(b.title);
    });
}

function makeWisdomsMap(){
    let wisdomsMap = {};
    for(let i = 0; i < wisdoms.length; i++){
        wisdomsMap[wisdoms[i].title] = wisdoms[i];
    }

    return wisdomsMap;
}

app.get('/', (req, res) => {
    res.sendFile('./html/index.html', sendFileOptions);
});

app.get('/api/wisdoms', (req, res) => {
    if(wisdoms.length === 0){
        return res.status(404).send({ error: 'No wisdoms. Come back later.' });
    }
    return res.status(200).send(wisdoms);
});

app.get('/api/wisdoms/:title', (req, res) => {
    const title = req.params.title;
    const wisdom = wisdomsMap[title];

    if(wisdom === undefined){
        return res.status(404).send({ error: 'No wisdom with that id.' });
    }
    let body = '';

    try{
        const file = fs.readFileSync('./wisdoms/' + wisdom.fileName);
        body = file.toString();
    }catch (error){
        body = 'Internal error reading this file.';
    }

    return res.send({
        title: wisdom.title,
        body: body,
        links: wisdom.links.sort(function (a, b){
            return a.description.localeCompare(b.description);
        })
    });
});

app.get('*', (req, res) => {
    return res.redirect('/');
});

app.listen(port, (error) => {
    if(error){
        console.log(error);
        console.log('Error starting server.');
    } else {
        console.log('Server started on port', port);
    }
});