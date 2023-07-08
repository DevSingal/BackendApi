import mongoose from "mongoose";

const dbConnection = ()=>{mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"ToDoApp"
} ).then(()=>{
    console.log("database is connected");
}).catch((err)=>{
    console.log("error occured :", err);
})}

export default dbConnection;