import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/route.js";

const server : Server= createServer((req:IncomingMessage,res:ServerResponse)=>{

   routeHandler(req,res);
})

server.listen(3000,()=>{
    console.log(`Server running on the port 3000`)
})