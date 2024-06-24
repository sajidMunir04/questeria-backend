var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const { mongoString, formDatabaseName, formCollectionName } = require('../../configuration');


router.post('/', async function(req, res, next) {
    const client = new MongoClient(mongoString);
    let conn;

     try {
        conn = await client.connect();
        let db = await conn.db(formDatabaseName);
        let collection = db.collection(formCollectionName);
        let result = await collection.insertOne(req.body);
        res.json({'result' : result});
     }
     catch {
        console.error(e);
        res.json({'error': e});
     }
});

module.exports = router;
