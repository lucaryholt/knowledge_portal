const MongoDB = require('mongodb');
const fs = require('fs');
const path = require('path');

const credentials = require('./credentials.json');

const insertPromise = async function (collectionName, data){
    return new Promise((resolve, reject) => {
        MongoDB.connect(credentials.connectionString, { useUnifiedTopology: true }, (error, client) => {
            if (error) throw new Error();

            const db = client.db('knowledge_portal');
            const collection = db.collection(collectionName);

            collection.insertOne(data, (error, result) => {
                if (error) {
                    reject();
                }

                client.close();

                resolve(result);
            })
        });
    });
}

const findPromise = async function (collectionName, query){
    return new Promise((resolve, reject) => {
        MongoDB.connect(credentials.connectionString, { useUnifiedTopology: true }, (error, client) => {
            if (error) throw new Error();

            const db = client.db('knowledge_portal');
            const collection = db.collection(collectionName);

            collection.find(query).toArray((error, result) => {
                if (error) {
                    reject();
                }

                client.close();

                resolve(result);
            });
        });
    });
}

async function find(collectionName, query){
    return await findPromise(collectionName, query);
}

async function insert(collectionName, data){
    return await insertPromise(collectionName, data);
}

module.exports = {
    find,
    insert
}