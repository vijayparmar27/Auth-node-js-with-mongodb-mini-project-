const mongoose=require('mongoose');

const data1= new mongoose.Schema({
    name:String,
    class:Number,
    email:String,
    image:String
})

const datav= new mongoose.model('data',data1);

module.exports={datav}