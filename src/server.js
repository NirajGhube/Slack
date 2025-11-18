import express from 'express';
import {ENV} from "./config/env.js";
import {connectDb} from "./config/db.js";


const app = express();

const PORT = process.env.PORT;


app.get ("/", (req,res) =>{
    res.send("Hello World! 123");
});
console.log("Mongo uri: ",ENV.MONGO_URI);
app.listen(ENV.PORT,()=>{
    console.log("MongoDB server started on port",ENV.PORT);
    connectDb()
});