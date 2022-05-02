const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/elastic', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true,
        })
        console.log('Connect successfully!!!')
    } catch (error) {
        console.log(error)
    }
}
module.exports = { connect }  