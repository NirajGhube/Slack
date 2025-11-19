import express from 'express';
import {ENV} from "./config/env.js";
import {connectDb} from "./config/db.js";
import Express from 'express';
import {clerkMiddleware} from "@clerk/express";
import {functions, inngest} from "./config/inngest.js";
import {serve} from "inngest/express";


const app = express();
app.use(express.json()); //req.body
app.use(clerkMiddleware()); //req.auth will be available inthe request object

const PORT = process.env.PORT;

app.use("/api/inngest", serve({ client: inngest, functions }));
app.get ("/", (req,res) =>{
    res.send("Hello World! 123");
});
console.log("Mongo uri: ",ENV.MONGO_URI);

const startServer = async () => {
    try {
        await connectDb();
        if(ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT,()=>{
                console.log("MongoDB server started on port",ENV.PORT);
                //connectDb()
            });
        }
    }catch (error){
        console.error("error starting server:",error);
        process.exit(1);
    }
};
startServer();

export default app;