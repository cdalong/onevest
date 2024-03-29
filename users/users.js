const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const port = 4001;
const apiUrl = "http://localhost:3000";

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String
  }

  extend type Query {
    fetchUser(id: ID!): User
    fetchAllUsers: [User]
  }
`;

const resolvers = {
  User: {
    __resolveReference(ref) {
      return fetch(`${apiUrl}/users/${ref.id}`).then(res => res.json());
    }
  },
  Query: {
    fetchUser(_, { id }) {
      return fetch(`${apiUrl}/users/${id}`).then(res => res.json());
    },
    fetchAllUsers() {
      return fetch(`${apiUrl}/users`).then(res => res.json());
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({ port }).then(({ url }) => {
  console.log(`Users service ready at ${url}`);
});


module.exports = resolvers;
module.exports = typeDefs;