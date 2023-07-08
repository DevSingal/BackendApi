import mongoose from "mongoose";

const dbConnection = ()=>{mongoose.connect(process.env.MONGO_URI,{
    dbName:"ToDoApp"
} ).then(()=>{
    console.log("database is connected");
}).catch((err)=>{
    console.log("error occured :", err);
})}

export default dbConnection;