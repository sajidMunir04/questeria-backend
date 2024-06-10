const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res) => {
    res.send('HA');
})

app.listen(port,() => {
    console.log('Listening on Port',port);
})


app.post('/api/createForm',(req,res) => {
    const questionsData = JSON.parse(req.body);
    
})