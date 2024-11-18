const express = require('express');
const path = require('path');


const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/express', (req, res) => {
  res.send('Az Express egy minimalista webes keretrendszer, amely a Node.js-hez készült.');
});

app.get('/greeting', (req, res) => {
  res.send('Hello, Dániel Nagy');
});

app.get('/nodejs', (req, res) => {
  res.send('A Node.js egy olyan szerveroldali JavaScript futtatókörnyezet, amely a V8 JavaScript motorra épül.');
});


let users = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Sam Johnson" }
];

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "Nincs ilyen felhasználó" });
  }
  res.status(200).json(user);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Név megadása kötelező" });
  }

  const newUser = {
    id: (users.length + 1).toString(),  
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);  
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "Nincs ilyen felhasználó" });
  }

  if (!name) {
    return res.status(400).json({ message: "Név megadása kötelező" });
  }

  users[userIndex].name = name;
  res.status(200).json(users[userIndex]);
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Nincs ilyen felhasználó" });
  }

  users.splice(userIndex, 1);  
  res.status(204).send();  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

