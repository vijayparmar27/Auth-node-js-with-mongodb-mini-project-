
const mongoose=require('mongoose');

// mongoose.connect("mongodb://localhost:27017/allData").then(()=>{console.log('database successfuly connect')}).catch((err)=>{
//     console.log(err)
// })

const connectDB=async ()=>{
    const connecting=await mongoose.connect("mongodb://localhost:27017/allData");
    console.log(`database connected`)
}

module.exports=connectDB;