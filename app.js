const express=require('express');
const app=express();
const path=require('path');

const admin=require('./routes/admin.js');
const product=require('./routes/shop.js');

const ErrorController=require('./controllers/error.js');

const bodyParser=require('body-parser');

app.set('view engine','ejs');


app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'/public')));

app.use('/admin',admin);
//console.log(admin.prod);
app.use('/product',product);

app.use('/',ErrorController);

app.listen('3000');


