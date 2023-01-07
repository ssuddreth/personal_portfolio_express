const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
  });

app.get("/", (req, res) => {
    res.send("Express on Vercel");
  });

app.listen(port);
console.log('Server started at port 3000');

module.exports = app;