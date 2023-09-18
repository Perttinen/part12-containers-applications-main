const mongoose = require('mongoose')
const Todo = require('./models/Todo')

// const { MONGO_URL } = require('../util/config')
// const { MONGO_URL } = require('../util/config')

const MONGO_URL = process.env.MONGO_URL

if (MONGO_URL && !mongoose.connection.readyState) mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
else console.log('no connection to mongo', MONGO_URL)


module.exports = {
  Todo
}
