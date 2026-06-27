import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server : Server= createServer((req:IncomingMessage,res:ServerResponse)=>{

    const url = req.url;
    const method=req.method;

    if(url ==='/' && method=="GET"){
      res.writeHead(200,{"content-type":"text/plain"})
      res.end("This is root route")
    }
})

server.listen(3000,()=>{
    console.log(`Server running on the port 3000`)
})