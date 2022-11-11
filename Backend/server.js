const express = require('express')
const http = require('http')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
const rooms = []
const chatMessage = []
/*
{
    message: data
    messagetype: pic or string
}
*/
let roomId = 0
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{    
    rooms.forEach((room)=>{
        room.users.forEach((user)=>{
            if(user.id !== socket.id){
                if(room.users.length !== 10){
                    room.users.push({id:socket.id ,name:'user'+socket.id})
                }
                else{
                    rooms.push({roomid:roomId,user:{id:socket.id ,name:'user'+socket.id}})
                    roomId++
                }
            }
        })
    })
    
    console.log(`user ${socket.id} is connectd`)
    socket.on('createRoom',(detail)=>{
        socket.broadcast.emit('createRoom:create',data)
    })
    socket.on('message',(data)=>{
        socket.broadcast.emit('message:received',data)
    })
    socket.on('disconnect',()=>{
        // console.log(room);
        // let id = 0;
        // room.forEach((user)=>{
        //     if(user.id === socket.id){
        //         room.splice(id, 1)
        //     }
        //     id++
        // })
        // if(room === []){

        // }
        console.log(`user ${socket.id} is left`);
    })
})

const port = 5000
server.listen(port, () => {
    console.log(`Example apps listening on port ${port}`)
})