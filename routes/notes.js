const router = require('express').Router();
const path = require('path');

const repo = require('../repo.js');

router.get('/api/notes/:pageId', (req, res) => {
    repo.find(req.params.pageId, { enabled: true })
        .then(result => {
            const collection = result.sort((a, b) => {
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

router.get('/api/notes/:pageId/:fileName', (req, res) => {
    return res.sendFile(path.join(__dirname, '../notes/', req.params.pageId, req.params.fileName));
});

module.exports = router;