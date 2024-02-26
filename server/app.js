import express  from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const port=3000;
const app = express();
const server= createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }             
});
app.use(cors(
    {
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
));
app.get('/',(req,res)=>{
    res.send("hello world")
})

io.on( 'connection' , ( socket ) =>{
    console.log('a user connected');
    console.log("ID",socket.id);     //jitne naye frontend url pe jayenge utne naye id print ho jayenge
    // socket.emit("welcome", "Welcome to the chat room"); 
    // socket.broadcast.emit("message", `A new client has joined ${socket.id}` );   //all clients except
    socket.on("message",({message,room})=>{
        console.log(message); 
        // io.emit("receive-message" , data) ;       //sending message to all clients
        io.to(room).emit("receive-message" , message) ;       //sending message to all clients and not me
    })
    socket.on( "disconnect" , ()=>{
        console.log("user disconnected",socket.id);
    });
})

server.listen(port,()=>{
    console.log(`server is running  on port ${port}`)
})
