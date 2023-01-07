const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// sendFile will go here
app.get("/", (req, res) => {
    res.send("Express on Vercel");
  });

app.listen(port);
console.log('Server started at port 5000');

module.exports = app;