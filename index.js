const express = require('express');
const path = require('path');
const exphbs = require("express-handlebars")

const logger = require('./middleware/logger');
const books = require('./books');



const app = express();
    
//body parse
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// homepage
app.get('/', (req, res)=> res.render('index', {
    title: 'Book App',
    books
}));


//app.use(logger);

//handlebars

app.engine('handlebars', exphbs({defualtLayout: 'main'}));
app.set('view engine', 'handlebars');



app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/books', require('./route/api/books'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));