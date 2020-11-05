const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.use(express.json());
router.use(express.urlencoded( { extended: true }));

const repo = require('../repo.js');
const formatter = require('../formatter.js');

router.get('/api/notes/:pageId', (req, res) => {
    repo.find(req.params.pageId, { enabled: true })
        .then(result => {
            const collection = result.map(result => {
                if (result.body === undefined) {
                    const file = fs.readFileSync(path.join(__dirname, '../notes', req.params.pageId, result.fileName));
                    return { ...result, body: file.toString() };
                }
                return { ...result, body: formatter.toHTML(result.body) };
            }).sort((a, b) => {
                return a.title.localeCompare(b.title);
            });

            if (collection.length === 0) {
                return res.status(404).send({ error: 'No notes. Come back later.' });
            }
            return res.status(200).send({
                data: collection
            });
        });
});

/*router.get('/api/notes/:pageId/:fileName', (req, res) => {
    repo.find(req.params.pageId, { fileName: req.params.fileName, enabled: true })
        .then(result => {
            return res.status(200).send({
                data: formatter.toHTML(result[0].body)
            });
        });
});*/

router.post('/api/notes/:pageId/:title', (req, res) => {
    repo.update(req.params.pageId, { title: req.params.title }, { body: req.body })
        .then(result => {
            return res.send({ result });
        });
});

module.exports = router;