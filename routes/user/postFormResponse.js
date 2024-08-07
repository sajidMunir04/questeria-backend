var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const { mongoString, formDatabaseName, formCollectionName, formUserDataCollection } = require('../../configuration');


router.post('/postFormData', async function(req, res, next) {

      // Handle preflight requests
    if (req.method === 'OPTIONS') {
         return res.status(200).end();
     }

     const userResponseData = {
         userData : req.body
     }

     try {
        const client = new MongoClient(mongoString);
        const conn = await client.connect();
        const db = conn.db(formDatabaseName);
        const collection = db.collection(formUserDataCollection);
        const result = await collection.insertOne(userResponseData);
        res.json({'result' : result});
        conn.close();
     }
     catch {
        console.error(e);
        res.json({'error': e});
     }
});

module.exports = router;
