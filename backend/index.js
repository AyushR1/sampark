const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)
var username = require('starwars-names')
var uniqueRandomArray = require('unique-random-array')
var starWarsName = require('./starwars-names.json');

const random = uniqueRandomArray(starWarsName);
const path = require('path')


app.use(express.static('../frontend/build'));

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend","build","index.html"));
})

const users={}

io.on('connection', socket => {
    //generate username against a socket connection and store it
    const userid=random()
    if(!users[userid]){
        users[userid] = socket.id
    }
    //send back username
    socket.emit('yourID', userid)
    io.sockets.emit('allUsers', users)
    
    socket.on('disconnect', ()=>{
        delete users[userid]
    })

    socket.on('callUser', (data)=>{
        io.to(users[data.userToCall]).emit('hey', {signal: data.signalData, from: data.from})
    })

    socket.on('acceptCall', (data)=>{
        io.to(users[data.to]).emit('callAccepted', data.signal)
    })

    socket.on('close', (data)=>{
        io.to(users[data.to]).emit('close')
    })

    socket.on('rejected', (data)=>{
        io.to(users[data.to]).emit('rejected')
    })
})

const port = process.env.PORT || 8000

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})