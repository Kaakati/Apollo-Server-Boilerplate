const { gql } = require('apollo-server-express');

const schema = gql`
type User {
  id: String!
  mobile: String!
  password: String!
  name: String!
  email: String!
  token: String
  role: Role!
}

type UserQuery {
  id: String!
  name: String!
  mobile: String!
  email: String!
  token: String
  role: Role!
}

input LoginInput {
  mobile: String!
  password: String!
}

input SignupInput {
  mobile: String!
  password: String!
  name: String!
  email: String!
  deviceId: String!
}

input UpdateUserInput {
  name: String!
  email: String!
}

type Mutation {
  loginUser(params: LoginInput): String
  createUser(params: SignupInput): UserQuery!
}

type Subscription {
  demoSubscription: UserQuery
}

type Query {
  fetchCurrentUser : UserQuery!
}

`;

module.exports = schema;