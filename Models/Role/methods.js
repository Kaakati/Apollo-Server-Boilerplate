// Importing 'Roles' collection.
const Roles = require('./model');

// Importing helpers.
const Helpers = require('../helpers');

const { ApolloError } = require('apollo-server');

exports.createRole = async function(params, context) {
    await Helpers.checkSuperAdmin(context);
    await Helpers.checkRoleParams(params);

    return new Promise((resolve, reject) => {
        var role = {
            name: params.name.toUpperCase()
        }

        const saveObject = new Roles(role);
        saveObject.save()
        resolve(saveObject);
    });
}

exports.updateRole = async function(id, params, context) {
    await Helpers.checkSuperAdmin(context);
    await Helpers.checkRoleParams(params);

    return new Promise((resolve, reject) => {
        if (!id) { reject(new ApolloError("Can not update entry.")) };

        Roles.findOneAndUpdate({_id: id}, { $set : params }, (err, role) => {
           if (!err || id != null || role != null) { 
                resolve(role) 
            };
       }).exec();
    });
}

exports.deleteRole = async function(id, context) {
    await Helpers.checkSuperAdmin(context);

    return new Promise((resolve, reject) => {
        if (!id) { reject(new ApolloError("Can not delete entry.")) };

        Roles.findOneAndDelete({_id: id}, (err, role) => {
           if (!err || id != null || role != null) { resolve("Success!") };
       }).exec();
    });
}

exports.fetchRole = function(input, context) {
    if (!context.user || (context.user.role.name != 'SUPER-ADMIN')) { return new ApolloError('Not Authorized!'); }
    return new Promise((resolve, reject) => {
        Roles.findOne({_id : input.id}, (err, role) => {
            resolve(role);
       })
    })
}

exports.fetchRoles = function(context) {
    console.log('context.user.role', context.user.role);
    if (!context.user || (context.user.role.name != 'SUPER-ADMIN')) { return new ApolloError('Not Authorized!'); }
    return new Promise((resolve, reject) => {
        console.log('promise works');
        Roles.find({}, (err, roles) => {
            resolve(roles);
       })
    })
}