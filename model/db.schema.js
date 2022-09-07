const mongoose=require('mongoose');

const user= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})


const users= new mongoose.model('users',user);


module.exports={users}