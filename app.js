// Calling modules
require('dotenv').config();
const express =  require('express');

const app = express();
// Choose port by deault if ina cloud server
const PORT = 5000 || process.env.PORT;

// Public folder containing CSS, Js ...
app.use(express.static('public'));

// Template Engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view.engine','ejs');

// Calling request and inserting response
app.get('',(req,res) => {
    res.send("Hello World");
});

app.listen(PORT,()=>{
    console.log('App Listening on port ${PORT}');
});