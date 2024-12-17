// const mongoose = require('mongoose');
// const mongoURL = 'mongodb://localhost:27017/hotels'
// mongoose.connect(mongoURL,{
//     UseNewUrlParser:true,
//     useUnifiedTopology:true
// })
// const db = mongoose.connection;
// db.on('connected',()=>{
//         console.log('connected to mongoDB server');
//     })
//     db.on('error',(err)=>{
//         console.log('mongodb connection error',err);
//     });
//     db.on('disconnected',()=>{
//         console.log('MongoDb disconnected');
//     });
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels';
require('dotenv').config();

const mongoURL1 = process.env.MONGODB_URL_LOCAL;
// mongourl2 = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURL)
  .then(() => console.log('Connected to MongoDB server'))
  .catch(err => console.log('MongoDB connection error', err));

const db = mongoose.connection;
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = db;
