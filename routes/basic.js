const router = require('express').Router();
const path = require('path');

router.get('/newpage', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/newpage.html'));
});

// Request handler that handles all GET requests, that are not specifically handled
router.get('*', (req, res) => {
    return res.redirect('/');
});

module.exports = router;