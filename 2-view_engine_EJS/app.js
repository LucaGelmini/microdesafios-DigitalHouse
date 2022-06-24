const express = require('express');
const path = require('path');
const indexRouter = require(path.join(__dirname,'./routes/index.js'))

const app = express();
const publicPath = path.join(__dirname, './public');

app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


app.use('/', indexRouter);



app.listen('3030', ()=>{
    console.log('servidor funcionando en el puerto 3030')
})

