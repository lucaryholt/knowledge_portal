require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/notes/:pageId', (req, res) => {
    const collection = require('./notes/' + req.params.pageId + '/collection.json').filter(note => {
        if (note.enabled) {
            return note;
        }
    }).sort( (a, b) => {
        return a.title.localeCompare(b.title);
    });

    if (collection.length === 0) {
        return res.status(404).send({ error: 'No notes. Come back later.' });
    }
    return res.status(200).send({
        data: collection
    });
});

app.get('/api/notes/:pageId/:fileName', (req, res) => {
    return res.sendFile(__dirname + '/notes/' + req.params.pageId + '/' + req.params.fileName);
});

app.get('/api/pages', (req, res) => {
    const enabledPages = require('./notes/pages.json').filter(page => {
        if (page.enabled === true) {
            return page;
        }
    });
    return res.send({ data: enabledPages });
});

app.get('/api/pages/:id', (req, res) => {
    return res.send({
        data : require('./notes/pages.json').find(page => {
            if (page.link === '/' + req.params.id && page.enabled) {
                return page;
            }
        })
    });
});

// Makes request handler for each page in pages.json
app.get(require('./notes/pages.json').map(page => { return page.link; }), (req, res) => {
    return res.sendFile(__dirname + '/public/page-template.html');
});

// Request handler that handles all GET requests, that are not specifically handled
app.get('*', (req, res) => {
    return res.redirect('/');
});

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
        console.log('Error starting server.');
    } else {
        console.log('Server started on port', Number(process.env.PORT));
    }
});