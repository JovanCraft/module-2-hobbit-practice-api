
const express = require('express');

const port = 8000

const server = express();

server.use(express.json()); // !! IMPORTANT this teaches express to parse req.body'


server.get('/hobbits', (req, res) => {
    console.log(req.query)
    // query string parameters get added to req.query
    const sortField = req.query.sortby || 'id';
    const hobbits = [
      {
        id: 1,
        name: 'Samwise Gamgee',
      },
      {
        id: 2,
        name: 'Frodo Baggins',
      },
      {
        id: 3,
        name: 'Bilbo Baggins',
      }
    ];

    // apply the sorting
    const response = hobbits.sort(
      (a, b) => (a[sortField] < b[sortField] ? -1 : 1)
    );

    res.status(200).json(response);
  });//READING DATA

  //when putting in localhost:8000/hobbits?sortby=name into Postman, the hobbits get sorted alphabetically by their name!
  //also whe ?sortby=name is passed into Postman, the req.query is { sortby: 'name' }

// add this code right after const server = express();
server.use(express.json());

let hobbits = [
  {
    id: 1,
    name: 'Bilbo Baggins',
    age: 111,
  },
  {
    id: 2,
    name: 'Frodo Baggins',
    age: 33,
  },
  {
    id: 3,
    name: 'Samwise Gamgee',
    age: 38,
  }
];
let nextId = 4;

// and modify the post endpoint like so:
server.post('/hobbits', (req, res) => {
    console.log(req.body)
    //when req.body is console.loged after submiting the proper info to Postman, I got this in the terminal: { name: 'Tom Cruise', age: 61 }
  const hobbit = req.body;
  hobbit.id = nextId++;

  hobbits.push(hobbit);

  res.status(201).json(hobbits);
});

server.put('/hobbits/:id', (req, res) => {

    const hobbit = hobbits.find(h => h.id == req.params.id);

  if (!hobbit) {
    res.status(404).json({ message: 'Hobbit does not exist' });
  } else {
    // modify the existing hobbit
    Object.assign(hobbit, req.body);

    res.status(200).json(hobbit);
  }

});//UPDATING DATA

server.delete('/hobbits/:id', (req, res) => {

    const id = req.params.id;
    // or we could destructure it like so: const { id } = req.params;
    console.log(req.params)//when http://localhost:8000/hobbits/frodo is put into Postman, the req.params is { id: 'frodo' }!!
  res.status(200).json({
    url: `/hobbits/${id}`,
    operation: `DELETE for hobbit with id ${id}`,
  });
});//DESTROYING/DELETING DATA

server.listen(port, () => console.log(`server listening on port ${port}`));


