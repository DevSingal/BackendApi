import mongoose from "mongoose";

const dbConnection = ()=>{mongoose.connect(process.env.MONGO_URI,{
    dbName:"ToDoApp"
} ).then((c)=>{
    console.log(`Database connection is established at ${c.connection.host}`);
    console.log(c.connection.host);
}).catch((err)=>{
    console.log("error occured :", err);
})}

export default dbConnection;