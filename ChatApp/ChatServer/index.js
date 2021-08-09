const io = require('socket.io')(8000,{
    cors: {
      origin: '*',
    }
  })

const users={}

io.on('connection', (socket)=>
{   //If there is a new user then add it and boradcast an event as user joined
    socket.on('newuserjoined', (username)=>
    {
        users[socket.id] = username
        socket.broadcast.emit('userjoined',username)
    })

    socket.on('disconnect', (temp)=>
    {
        socket.broadcast.emit('discon',users[socket.id])
        delete users[socket.id]
    })

    socket.on('send',(message)=>
    {
        socket.broadcast.emit('recieve', {username: users[socket.id] , message})
    })
})
