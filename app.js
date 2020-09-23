const express = require('express');
const path = require('path');
const fs = require('fs');

const publicPath = path.join(__dirname, 'public');
const sendFileOptions = { root: publicPath };
const wisdoms = require('./wisdoms/wisdoms.json').sort(function (a, b){
    return a.title.localeCompare(b.title);
});
const wisdomsMap = makeWisdomsMap();
const searchTerms = makeSearchTerms();

const app = express();
app.use(express.static(publicPath));

function makeWisdomsMap(){
    let wisdomsMap = {};
    for(let i = 0; i < wisdoms.length; i++){
        wisdomsMap[wisdoms[i].title] = wisdoms[i];
    }

    return wisdomsMap;
}

function makeSearchTerms(){
    return wisdoms.map(wisdom => {
        const terms = wisdom.searchTerms.map(term => {
            return term;
        });
        return { page : wisdom.title, terms: terms };
    });
}

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

    let body;
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

app.get('/api/searchTerms', (req, res) => {
    return res.send( { data : searchTerms});
});

app.get('*', (req, res) => {
    return res.redirect('/');
});

const port = process.env.PORT ? process.env.PORT : 80;

app.listen(port, (error) => {
    if(error){
        console.log(error);
        console.log('Error starting server.');
    } else {
        console.log('Server started on port', Number(port));
    }
});