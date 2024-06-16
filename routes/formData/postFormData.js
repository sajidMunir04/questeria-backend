const e = require('express');
var express = require('express');
const { MongoClient } = require('mongodb');
var router = express.Router();
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

router.post('/api/postFormData', async function(req, res, next) {
    const client = new MongoClient(mongoString);
    let conn;

     try {
        conn = await client.connect();
        let db = await conn.db('formData');
        let collection = db.collection('');
        let result = await collection.insertOne(req.body);
        res.json({'result': result});
     }
     catch {
        console.error(e);
        res.json({'error': e});
     }
});

module.exports = router;
