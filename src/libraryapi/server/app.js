const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');
const rankRoutes = require('./routes/rankRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.use('/books', bookRoutes);

app.use('/loans', loanRoutes);

app.use('/rank', rankRoutes);

module.exports = app;