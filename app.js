// Calling libraries
require('dotenv').config();
const express =  require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
// Choose port by deault if ina cloud server
const PORT = 5000 || process.env.PORT;

// Public folder containing CSS, Js ...
app.use(express.static('public'));

// Template Engine
app.use(expressLayout);
app.set('layout','./layouts/main');
// Set the view engine
app.set('view engine','ejs');


// Using routes foldder to set main page
app.use('/',require('./server/routes/main'));

app.listen(PORT,()=>{
    console.log('App Listening on port ${PORT}');
});