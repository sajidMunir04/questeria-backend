var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const { mongoString, formDatabaseName, formCollectionName } = require('../../configuration');

router.get('/getFormData', async function(req, res, next) {

     try {
         const client = new MongoClient(mongoString);
         const conn = await client.connect();
         const db = conn.db(formDatabaseName);
         const collection = db.collection(formCollectionName);
         const data = await collection.findOne({});
         res.json(data);
         conn.close();
     }
     catch {
        console.error(e);
        res.json({'error': e});
     }
});

module.exports = router;
