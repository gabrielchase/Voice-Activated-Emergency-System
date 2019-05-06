module.exports = (io) => {
    console.log('In socket_api.js')
    
    io.on('connection', (socket) => {
        console.log('a user connected')
        
        socket.on('emergency', (coordinates) => {
            console.log('EMERGENCY ON: ', coordinates)
        })
    
        socket.on('disconnect', () => {
              console.log('user disconnected')
        })

        socket.on('hello', (msg) => {
            console.log('msg: ', msg)
        })
    })
}
