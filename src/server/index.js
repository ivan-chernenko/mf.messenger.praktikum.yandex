const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();
const pathToStatic = path.join(__dirname, '..', 'static');

app.use(express.static(pathToStatic));

app.listen(PORT);