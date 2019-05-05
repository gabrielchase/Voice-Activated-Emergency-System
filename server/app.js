const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/config')

console.log('CONFIG: ', config)

mongoose.connect(config.DB_URL, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.set('debug', true)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

const app = new express()

app.use(bodyParser.json({ limit: '192mb' }))
app.use(bodyParser.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use(cors())

app.get('/api/sanity', (_, res) => {
    res.json({ sane: true })
})

require('./routes/auth')(app)
require('./routes/emergency')(app)

app.listen(config.PORT, () => {
    console.log(`Server running on ${config.PORT}`)
})

module.exports = { app }
