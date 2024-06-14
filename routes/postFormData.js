var express = require('express');
var router = express.Router();
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

router.post('/api/postFormData', function(req, res, next) {
    
});

module.exports = router;
