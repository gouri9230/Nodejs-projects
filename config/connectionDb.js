import mongoose from 'mongoose';
const dotenv = require('dotenv').config();

const connectDb = mongoose.connect(process.env.CONNECTION_DB)
.then(()=> {
    console.log('Connected to database!')})
.catch(()=>{
    console.log("Connection to database failed")
});

export default connectDb;