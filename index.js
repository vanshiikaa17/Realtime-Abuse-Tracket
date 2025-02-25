const express = require('express');
const http = require('http');
const {Server} = require("socket.io");
const path = require("path");
const loadWordsFromFile = require('./readFile');
const Trie = require('./trie');
const filePath = "./abuseFile.txt";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve("./public")));

const trie = new Trie();

io.on("connection", (socket)=>{
    const words = loadWordsFromFile(filePath);
    // console.log(words.toString());
    words.forEach(word => trie.insert(word));
    
    console.log("New user: ", socket.id);
    socket.on("message", (message)=>{
        console.log("message received from user: ", message);
        if(isAbuseFree(message) === true){

            io.emit("message", message);
        }else{
            io.emit("errorMsg","Message can't be displayed. Foul language detected!");
        }
    })
})
app.get("/",(req,res)=>{
    console.log("OK");
    return res.status(200).sendFile("/public/index.html");
})

function isAbuseFree(message){
    splitMessage=message.toLowerCase().split(/\s+/);
    for(let word of splitMessage){
        word=word.replace(/[^a-zA-Z0-9\s]/g, "");
        if(trie.search(word)){
            
            return false;
        }
    }
    return true;
}
server.listen(3000, ()=>{
    console.log( `Abuse master listening on port 3000`);
});