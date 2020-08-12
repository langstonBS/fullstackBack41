const express = require('express');
const app = express();
const cors = require('cors');

app.use(require('cookie-parser')({ origin:true, credentials:true }));
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/cereal', require('./routes/cereal'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
