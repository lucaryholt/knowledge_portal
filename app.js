const express = require('express');
const path = require('path');
const fs = require('fs');

const publicPath = path.join(__dirname, 'public');

const pages = require('./pages.json');

const app = express();
app.use(express.static(publicPath));

//TODO editing/adding wisdom page, with auto updating preview of body (jQuery get and insert in)

function makeSearchTerms(collectionName){
    const collection = require('./notes/' + collectionName + '/collection.json');
    return collection.map(item => {
        const terms = item.searchTerms.map(term => {
            return term;
        });
        return { page : item.title, terms: terms };
    });
}

function getNote(collection, name){
    return collection.find(note => {
        if(note.fileName === name){
            return note;
        }
    });
}

app.get('/api/wisdoms/:id', (req, res) => {
    const collectionName = req.params.id;
    const collection = require('./notes/' + collectionName + '/collection.json').sort(function (a, b){
        return a.title.localeCompare(b.title);
    });

    if(collection.length === 0){
        return res.status(404).send({ error: 'No wisdoms. Come back later.' });
    }
    return res.status(200).send(collection);
});

app.get('/api/wisdoms/:id/:file', (req, res) => {
    const collectionName = req.params.id;
    const fileName = req.params.file;

    const note = getNote(require('./notes/' + collectionName + '/collection.json'), fileName);

    let body;
    try{
        const file = fs.readFileSync('./notes/' + collectionName + '/' + fileName);
        body = file.toString();
    }catch (error){
        console.log(error);
        body = 'Internal error reading this file.';
    }

    return res.send({
        title: note.title,
        body: body,
        links: note.links.sort(function (a, b){
            return a.description.localeCompare(b.description);
        })
    });
});

app.get('/api/searchTerms/:id', (req, res) => {
    const id = req.params.id;

    return res.send( { data : makeSearchTerms(id)});
});

app.get('/api/notebooks', (req, res) => {
    const enabledPages = pages.filter(page => {
        if(page.enabled === true){
            return page;
        }
    });
    res.send({ data: enabledPages });
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