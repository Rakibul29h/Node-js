import { createServer, IncomingMessage, Server } from "http";

const server : Server= createServer((req:IncomingMessage,res)=>{

})

server.listen(3000,()=>{
    console.log(`Server running on the port 3000`)
})