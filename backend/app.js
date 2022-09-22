const express = require('express');
const app = express();

const errorMiddleWare = require('./middleWares/error')


app.use(express.json());

//Import Product routes
const products = require('./routes/product');

// Import user auth routes
const auth = require('./routes/auth');

// Use for product
app.use('/api/v1', products)

// Use for user auth
app.use('/api/v1', auth)

// middleware to handle error
app.use(errorMiddleWare);


module.exports = app;