// Importing 'users' collection.
const User = require('../Models/User/model');
const UserMethods = require('../Models/User/methods')

// Adding 'Super Admin' user.
User.findOne({ mobile : "111" }, (error, user) => {
    if(error){ console.log('error', error); }
    if(!user){

        let params = {
            name : 'Super Admin',
            email: 'email@example.com',
            mobile: '111',
            password: '111'
        }

        UserMethods.createNewUser(params);
    }
})