/**
 * Apollo Server Boilerplate, released under MIT license.
 * Created by Mohamad Kaakati
 * Email: m@kaakati.me
 * This software is provided as is.
 * 2019
 */

const mongoose = require('mongoose');

exports.connectToDB = function() {
    mongoose.connect('mongodb://<admin>:<password>@url_to_database', { useCreateIndex: true, useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', () => {
        console.log("Database Faild to connect")
    })
    .once('open', () => { 
        console.log("Database Connected!");
        console.log('Calling Seeds.');
        require('../seeds/index'); 
    });
}