const express = require('express');
const app = express();

app.use(express.static('public'));

app.use(require('./routes/notes.js'));

app.use(require('./routes/pages.js'));

app.use(require('./routes/basic.js'));

const port = process.env.PORT ? process.env.PORT : 80;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        console.log('Error starting server.');
    } else {
        console.log('Server started on port', Number(port));
    }
});