var express = require('express');
var router = express.Router();
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

router.get('/api/getFormData', function(req, res, next) {
    

    const data = '';
});

module.exports = router;
