import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/route.js";
import config from "./dotenv/index.js";



const server : Server= createServer((req:IncomingMessage,res:ServerResponse)=>{

   routeHandler(req,res);
})

server.listen(config.PORT,()=>{
    console.log(`Server running on the port ${config.PORT}`)
})