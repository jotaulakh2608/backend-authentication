import mongoose from "mongoose";

const connection = async(username, password)=>{
    const URL = `mongodb+srv://${username}:${password}@cluster0.cmdfrdf.mongodb.net/?retryWrites=true&w=majority`
    try {
       await mongoose.connect(URL,{useUnifiedTopology:true, useNewUrlParser:true})
        console.log('connection done');
        
    } catch (error) {
        console.log('Problem in connection');
    }
}

export default connection;