// To use values from .env file
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const {expenseSummaryModel: ExpenseSummary} = require('./models/expenseModel');

//initializing express app
const app = express();

//express middleware to access POST request body
app.use(express.json())

//logger middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes middleware
app.use('/api/expenses', expenseRoutes);
app.use('/api/user', userRoutes)

//connect to Mongo DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to database')
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log('eror in connection')
    })
