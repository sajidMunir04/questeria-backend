var express = require('express');
var router = express.Router();
require('dotenv').config();
const { MongoClient } = require('mongodb');

const mongoString = process.env.DATABASE_URL;

router.get('/api/getFormData', async function(req, res, next) {
    const client = new MongoClient(mongoString);
    let conn;

     try {
        conn = await client.connect();
        let db = await conn.db('formData');
        let collection = db.collection('');
        let data = collection.findOne({ _id: req.body})
        res.json({'data': result});
     }
     catch {
        console.error(e);
        res.json({'error': e});
     }
});

module.exports = router;
