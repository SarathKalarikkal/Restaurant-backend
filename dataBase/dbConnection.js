import mongoose from "mongoose";

export const dbConnection = ()=>{
     mongoose.connect(process.env.MONGO_URI, {
        dbName : "RESTAURANT"
     })
     .then(()=>{
        console.log("Connect to DB SuccessFully");
     })
     .catch((err)=>{
        console.log("DB connection error", err);
     })
}

 