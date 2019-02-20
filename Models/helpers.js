// Importing ApolloError.
const { ApolloError } = require('apollo-server');

// Users.
exports.checkUser = function(context) {
    return new Promise((resolve, reject) => {
        if(!context.user){ reject(new ApolloError('Not Authorized!')) };
        resolve();
    })
}

exports.checkSuperAdmin = function(context) {
    return new Promise((resolve, reject) => {
        if(!context.user){ reject(new ApolloError("Not Authorized!")) }
        if(context.user.role != 'SUPER-ADMIN') { reject(new ApolloError('Not Authorized!')) }
        resolve();
    })
}

exports.checkAdmin = function(context) {
    return new Promise((resolve, reject) => {
        if(!context.user){ reject(new ApolloError("Not Authorized!")) }
        if(context.user.role != 'SUPER-ADMIN' || context.user.role != 'ADMIN') { reject(new ApolloError('Not Authorized!')) }
        resolve();
    })
}

exports.checkEditor = function(context) {
    return new Promise((resolve, reject) => {
        if(!context.user){ reject(new ApolloError("Not Authorized!")) }
        if(context.user.role != 'SUPER-ADMIN' || context.user.role != 'ADMIN' || context.user.role != 'EDITOR') { reject(new ApolloError('Not Authorized!')) }
        resolve();
    })
}

exports.checkRoleParams = function(params){
    return new Promise((resolve, reject) => {
        if(!params.name || params.name == null || params.name == undefined) { reject(new ApolloError('Enter role name!')) }
        resolve();
    })
}
