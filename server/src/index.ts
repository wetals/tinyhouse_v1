import express from 'express';
const app = express();
const port = 9000;

app.get('/', (_req, res) => {
  res.send('Hello MyWorld!');
});

app.listen(port);
console.log(`[ app ] : http://localhost:/${port}`);
