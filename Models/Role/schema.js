const { gql } = require('apollo-server-express');

const schema = gql`
    type Role {
        id: String!
        name: String!
    }
    input RoleInput {
        name: String!
    }
    type Mutation {
        createRole(params: RoleInput!) : Role!
        updateRole(id: String!, params: RoleInput!) : Role!
        deleteRole(id: String!) : String!
    }
    type Query {
        fetchRoles : [Role]!
        fetchRole(id: String!) : Role
    }
`;

module.exports = schema;

