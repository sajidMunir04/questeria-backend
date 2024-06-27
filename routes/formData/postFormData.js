var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const { mongoString, formDatabaseName, formCollectionName } = require('../../configuration');


router.post('/postFormData', async function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
   res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   
      // Handle preflight requests
       if (req.method === 'OPTIONS') {
         return res.status(200).end();
     }

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
