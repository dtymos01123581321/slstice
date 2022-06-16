const keys = require('./config/keys');
//const logger = require('./helpers/logger');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

console.log(path.join(__dirname, 'build', 'index.html'));
// For react
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = keys.frontPort || 3005;

app.listen(port, () => {
  console.info(`Frontend listerning on port ${port}`);
});
