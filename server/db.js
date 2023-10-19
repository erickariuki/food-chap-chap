const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://maroridhiwani:mvYOM9etuRne1gAf@users.nucnmse.mongodb.net/restaurants'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var db = mongoose.connection
db.on('connected', () => {
    console.log('Mongo db connected successfully');
})
db.on('error', () => {
    console.log('Mongo db failed to connect');
})

module.exports = mongoose
