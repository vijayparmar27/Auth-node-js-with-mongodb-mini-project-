const connetcDB=require('./model/db')
const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
const cookieParser = require('cookie-parser');
const app=express();
const port=8000;

connetcDB();

const publicDirectory=path.join(__dirname,'./public');


app.set('view engine','hbs');
app.set('view engine','ejs');

app.use(express.static(publicDirectory));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

dotenv.config({path:'./.env'});

app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'))
app.use('/',require('./routes/CRUD'));

app.listen(port,()=>{
    console.log('complate listen sever');
});