const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const port = 4002;
const apiUrl = "http://localhost:3000";

const typeDefs = gql`

  type Posts {
    id: ID!
    author: User
    content: String
    postDate: String
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    fetchAllPosts: [Posts]
  }

  extend type Query {
    fetchPost(id: ID!): Posts
    fetchAllPosts: [Posts]
  }
`;

const resolvers = {
  User: {
    async fetchAllPosts(user) {
      const res = await fetch(`${apiUrl}/posts`);
      const posts = await res.json();

      return posts.filter(({ author }) =>
        author == (parseInt(user.id))
      );
    }
  },
  Query: {
    fetchPost(_, { id }) {
      return fetch(`${apiUrl}/posts/${id}`).then(res => res.json());
    },
    fetchAllPosts() {
      return fetch(`${apiUrl}/posts`).then(res => res.json());
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({ port }).then(({ url }) => {
  console.log(`posts service ready at ${url}`);
});


module.exports = resolvers;
module.exports = typeDefs;