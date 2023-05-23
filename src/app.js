const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(require('./routes/index'));

module.exports = app;
