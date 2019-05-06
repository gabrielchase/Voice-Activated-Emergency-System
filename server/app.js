const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/config')
const app = new express()

mongoose.connect(config.DB_URL, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.set('debug', true)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use(bodyParser.json({ limit: '192mb' }))
app.use(bodyParser.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use(cors())

app.get('/api/sanity', (_, res) => {
    res.json({ sane: true })
})

const server = app.listen(config.PORT, () => {
    console.log(`Server running on ${config.PORT}`)
})
const io = require('socket.io')(server)

require('./routes/auth')(app)
require('./routes/emergency')(app, io)

require('./socket_api')(io)

module.exports = { app }
