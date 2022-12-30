import express from 'express';
import connection from './database/db.js';
import dotenv from 'dotenv';
import Routes from './Route/route.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express()

dotenv.config();

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const username= process.env.DB_USERNAME
const password= process.env.DB_PASSWORD 

app.use('/api', Routes)

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.w9cwwpm.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    // listen for requests
    app.listen(9000, () => {
      console.log('connected to db & listening on port', 9000)
    })
  })
  .catch((error) => {
    console.log(error)
  })


app.listen('8000', ()=>{
    console.log("server started at 8000");
})