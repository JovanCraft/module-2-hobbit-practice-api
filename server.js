
const express = require('express');

const port = 8000

const server = express();

server.use(express.json()); // !! IMPORTANT this teaches express to parse req.body'


server.get('/hobbits', (req, res) => {

    res.status(200).send('Welcome to Hobbiton');
});

server.post('/hobbits', (req, res) => {

    res.status(201).json({ url: '/hobbits', operation: 'POST'}); // 201 means "Created"
  });

server.put('/hobbits/:id', (req, res) => {

    res.status(200).json({ url: '/hobbits', operation: 'PUT'})

});
server.delete('/hobbits/:id', (req, res) => {

    res.sendStatus(204)
});

server.listen(port, () => console.log(`server listening on port ${port}`));
