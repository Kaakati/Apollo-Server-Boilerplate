/**
 * Apollo Server Boilerplate, released under MIT license.
 * Created by Mohamad Kaakati
 * Email: m@kaakati.me
 * This software is provided as is.
 * 2019
 */

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const app = express();
const http = require('http');

// Importing 'body-parser' package.
const bodyParser = require('body-parser')

// Importing 'users' collection.
const User = require('./Models/User/model');

const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: process.env.PORT, hostname: 'localhost' },
    development: { ssl: false, port: 4000, hostname: 'localhost' }
};
  
const environment = process.env.NODE_ENV || 'development';
const config = configurations[environment];

app.use(cors());
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));

const schema = require('./Models/allSchemas');
const resolvers = require('./Resolvers/resolvers');

const apollo = new ApolloServer({
  typeDefs: schema,
  resolvers,
  playground: true,
  introspection: true,
  formatError: error => {
    return error.message;
    // Or, you can delete the exception information
    // delete error.extensions;
    // delete error.path;
    // delete error.locations;
    // return error.message;
  },
  context: async ({ req, connection  }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      // get the user token from the headers
      const token = req.headers.authorization || '';
      const language = req.headers.language || 'ar';
      // try to retrieve a user with the token
      const user = token ? await _getUser(token.replace("Bearer ","")) : null;
      // optionally block the user
      // we could also check user roles/permissions here
      
      // add the user to the context
      return { user, language };
    }
  },
});

// Find user with Token
async function _getUser(token) {
  return new Promise((resolve, reject) => {
    User.findOne({token: token}, (err, user) => {
      resolve(user);
    }).populate('role').exec();
  })
}

// Create HTTP & Apollo Server
const server = http.createServer(app);

apollo.applyMiddleware({ app, path: '/graphql' });
apollo.installSubscriptionHandlers(server)

server.listen({ port: config.port }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
  )
)