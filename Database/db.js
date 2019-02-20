const mongoose = require('mongoose');

exports.connectToDB = function() {
    mongoose.connect('mongodb://<admin>:<password>@url_to_database', { useCreateIndex: true, useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', () => {
        console.log("Database Faild to connect")
    })
    .once('open', () => { 
        console.log("Database Connected!");
        // console.log('Calling Seeds.');
        // require('../models/seeds/index'); 
    });
}