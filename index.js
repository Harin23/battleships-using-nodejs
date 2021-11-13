const express = require('express');
const { appendFile } = require('fs');
const server = express();
const path = require('path');

const PORT = 3000;

server.use(express.static(path.join(__dirname, '/frontend/build')));

server.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));