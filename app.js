const express = require('express');
const app = express();
const morgan =  require('morgan');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const btcRoutes = require('./api/routes/btcRate')
const userRoutes = require('./api/routes/users')

app.use('/btcRate', btcRoutes);
app.use('/user', userRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;