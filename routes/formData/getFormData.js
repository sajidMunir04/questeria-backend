var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const { mongoString, formDatabaseName, formCollectionName } = require('../../configuration');

router.get('/getFormData', async function(req, res, next) {

   res.send("Get Form Data Page");

   /*
    const client = new MongoClient(mongoString);
    let conn;

     try {
        conn = await client.connect();
        let db = await conn.db(formDatabaseName);
        let collection = db.collection(formCollectionName);
        let data = collection.findOne({ _id: req.body})
        res.json({'data' : data});
     }
     catch {
        console.error(e);
        res.json({'error': e});
     }
        */
});

module.exports = router;
