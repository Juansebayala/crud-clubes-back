const express = require('express');
const app = express();

app.use(express.static('uploads'));

app.use(require('./routes/index'));

module.exports = app;
