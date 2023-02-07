const app = require('express')()
const mongoose = require('mongoose');
const http = require('http').createServer(app)
const PORT = 8081

const io = require('socket.io')(http)

app.get("/", (req, res) => {
    res.send(`This is the home page, please go to "localhost:${PORT}/index.html"`)
})

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('Connected ')

    socket.on('message', (data) => {
        console.log(`Room Name: ${data.room}`)
        socket.emit('message', `${data.message}`)
        socket.broadcast.to(data.room).emit('message', data.message)
    })

    socket.on('newUser', (name) => {
        console.log(name)
        users.push(name)
        console.log(users)
    })

    socket.on('joinroom', (room) => {
        socket.join(room)
        roomName = room
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})

http.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
