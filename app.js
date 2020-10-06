const express = require('express');
const fs = require('fs');

const pages = require('./notes/pages.json');

const app = express();
app.use(express.static('public'));

// TODO Comment complicated code areas

app.get('/api/notes/:id', (req, res) => {
    const collectionName = req.params.id;
    const collection = require('./notes/' + collectionName + '/collection.json').sort( (a, b) => {
        return a.title.localeCompare(b.title);
    });

    if(collection.length === 0){
        return res.status(404).send({ error: 'No notes. Come back later.' });
    }
    return res.status(200).send({
        data: collection.filter(note => {
            if (note.enabled) {
                return note;
            }
        })
    });
});

app.get('/api/notes/:id/:file', (req, res) => {
    const collectionName = req.params.id;
    const fileName = req.params.file;

    const note = require('./notes/' + collectionName + '/collection.json').find(note => {
        if (note.fileName === fileName) {
            return note;
        }
    });

    let body;
    try {
        const file = fs.readFileSync('./notes/' + collectionName + '/' + fileName);
        body = file.toString();
    } catch (error) {
        console.log('Error reading file:', fileName, 'in collection', collectionName);
        body = 'Internal error reading this file.';
    }

    return res.send({
        title: note.title,
        body: body,
        links: note.links.sort( (a, b) =>{
            return a.description.localeCompare(b.description);
        })
    });
});

app.get('/api/searchTerms/:id', (req, res) => {
    const id = req.params.id;

    const collection = require('./notes/' + req.params.id + '/collection.json');
    const terms = collection.map(item => {
        const terms = item.searchTerms.map(term => {
            return term;
        });
        return { page : item.title, terms: terms };
    });

    return res.send( { data : terms });
});

app.get('/api/notebooks', (req, res) => {
    const enabledPages = pages.filter(page => {
        if (page.enabled === true) {
            return page;
        }
    });
    return res.send({ data: enabledPages });
});

app.get('/api/pages/:id', (req, res) => {
    const id = req.params.id;

    return res.send({
        data : pages.find(page => {
            if (page.link === '/' + id && page.enabled) {
                return page;
            }
        })
    });
});

app.get(pages.map(page => { return page.link; }), (req, res) => {
    return res.sendFile(__dirname + '/public/page-template.html');
});

app.get('*', (req, res) => {
    return res.redirect('/');
});

const port = process.env.PORT ? process.env.PORT : 80;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        console.log('Error starting server.');
    } else {
        console.log('Server started on port', Number(port));
    }
});