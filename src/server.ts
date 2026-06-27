import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server : Server= createServer((req:IncomingMessage,res:ServerResponse)=>{

    const url = req.url;
    const method=req.method;

    if(url ==='/' && method=="GET"){
      res.writeHead(200,{"content-type":"application/json"})
      res.end(JSON.stringify({message:"This is root route"}))
    }else if(url?.startsWith("/product")){
        res.writeHead(200,{"content-type":"application/json"})
      res.end(JSON.stringify({message:"This is Product route"}))
    }
    else{
        res.writeHead(404,{"content-type":"application/json"})
      res.end(JSON.stringify({message:"Route not found"}))
    }
})

server.listen(3000,()=>{
    console.log(`Server running on the port 3000`)
})