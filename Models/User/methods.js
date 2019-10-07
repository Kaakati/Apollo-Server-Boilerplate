const { ApolloError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const User = require('./model');

// Create New User
exports.createNewUser = async function(params) {
    return new Promise((resolve, reject) => {
        
        User.findOne({mobile: params.mobile}, (error, user) => {
            if (user != null) {
                reject(new ApolloError("User Already Exists"));
            } else {
                var hashedPassword = bcrypt.hashSync(params.password, salt);
                // console.log(hashedPassword);
                const user = {
                    // id: uuid(),
                    name: params.name,
                    email: params.email,
                    mobile : params.mobile,
                    password: hashedPassword,
                };

                // Create new User
                const newUser = new User(user);
 
                newUser.save()
                // Resolve New User
                resolve(newUser);    
            }
        });
    })
}

// Login User & Return JWT Token
exports.loginUser = async function(params) {
    console.log('loginUser works');
    return new Promise((resolve, reject) => {
        const user = User.findOne({
            mobile: params.mobile
        }, (err, user) => {
            console.log('user', user);
            var loginUser = user;
            var newToken = jwt.sign({
                mobile: loginUser.mobile
            }, 'abraCadabraTheMagicWorkd'); // Change the secret as you wish.
            // console.log(newToken);
            if (bcrypt.compareSync(params.password, loginUser.password)) {
                User.updateOne({
                    mobile: loginUser.mobile
                }, {
                    token: newToken
                }, (err, user) => {
                    console.log('User Token', newToken);
                    resolve(newToken);
                });
            }
        }).populate('role');
    })    
}

// Fetch Current Logged In User by Token
exports.fetchCurrentUser = async function(context) {
    console.log(context)
    return new Promise((resolve, reject) => {
        if (!context.user) {
            reject(new ApolloError("Login Required"));
        }
        resolve(context.user);
    })
}