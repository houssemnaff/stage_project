const express = require('express');
require('./connect');

const app = express();
app.use(express.json());
const ticketsrouter= require('./routers/tickets');
const commentsrouter= require('./routers/comments');
const userrouter = require('./routers/users');
const sendmailer= require('./routers/sendmailer');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/tickets',ticketsrouter);
app.use('/comments',commentsrouter);
app.use('/users',userrouter);
app.use('/sendemail',sendmailer);

app.listen(3001, () => {
    console.log('server work');
})