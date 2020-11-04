const MongoDB = require('mongodb');
const fs = require('fs');
const path = require('path');

const credentials = require('./credentials.json');
const collections = credentials.collections;
const date = new Date();
const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
const directoryPath = path.join(__dirname, 'backup', dateString);

console.log('Backing up repo.');

try {
    fs.mkdirSync(directoryPath);
    console.log('Directory created at: ', directoryPath);
} catch (error) {
    console.log('Backup directory exists.');
}

collections.map(col => {
    MongoDB.connect(credentials.connectionString, { useUnifiedTopology: true }, (error, client) => {
        if (error) throw new Error();

        const db = client.db('knowledge_portal');
        const collection = db.collection(col);
        collection.find({}).toArray((error, result) => {
            if (error) {
                console.log(error);
            }
            fs.writeFileSync(path.join(directoryPath, col + '.json'), JSON.stringify(result));
            client.close();
        });
    });
});

console.log('Backup complete.');