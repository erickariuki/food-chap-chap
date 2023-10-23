const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://fudchapchap2:$Philip2004$@users.nucnmse.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var db = mongoose.connection
db.on('connected', () => {
    console.log('Mongo db connected successfully');
})
db.on('error', () => {
    console.log('Mongo db failed to connect');
})

module.exports = mongoose
