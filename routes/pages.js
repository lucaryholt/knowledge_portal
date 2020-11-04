const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.json());
router.use(express.urlencoded( { extended: true }));

const repo = require('../repo.js');
let pages = [];

// Gets 'pages' data and instantiates request handler
// This request handler gets updated at other times
repo.find('pages', { enabled: true })
    .then(result => {
        if (result.length === 0) return res.send({ error: 'No pages found' });
        pages = result;

        // Makes request handler for each page
        router.get(pages.map(page => { return page.link; }), (req, res) => {
            return res.sendFile(path.join(__dirname, '../public/page-template.html'));
        });
    });

router.get('/api/pages', (req, res) => {
    repo.find('pages', { enabled: true })
        .then(result => {
            if (result.length === 0) return res.send({ error: 'No pages found' });
            pages = result;

            // Makes request handler for each page
            router.get(pages.map(page => { return page.link; }), (req, res) => {
                return res.sendFile(path.join(__dirname, '../public/page-template.html'));
            });

            return res.send({ data: pages });
        });
});

router.get('/api/pages/:id', (req, res) => {
    repo.find('pages', { link: '/' + req.params.id, enabled: true })
        .then(result => {
            return res.send({ data : result[0] });
        });
});

router.post('/api/pages', (req, res) => {
    repo.insert('pages', req.body)
        .then(result => {
            return res.send(result);
        })
});

module.exports = router;