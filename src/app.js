const express = require('express');
const app = express();
const router = express.Router();

// Aqui importamos as rotas da nossa API
const index = require('./routes/index');
const userRoute = require('./routes/animal-route');

app.use('/', index);
app.use('/animals', userRoute);

module.exports = app;