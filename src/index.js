import { ApolloServer, gql } from 'apollo-server'
import db from "./db";

const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
    user(id: ID!): User
    post(id: ID!): Post
  }

  type User {
    name: String!
    email: String!
    age: Int
    id: ID!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    title: String!
    body: String!
    id: ID!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
    author: User!
  }
`;

const resolvers = {
  Query: {
    users() {
      return db.users;
    },

    posts() {
      return db.posts;
    },
    user(_, args) {
      return db.users.find(user => user.id === args.id)
    },
    post(_, args) {
      return db.posts.find(post => post.id === args.id)
    }
  },

  User: {
    posts(user) {
      return db.posts.filter(post => post.author === user.id);
    },
    comments(user) {
      return db.comments.filter(comment => comment.author === user.id);
    }
  },

  Post: {
    author(post) {
      return db.users.find(user => user.id === post.author);
    },
    comments(post) {
      return db.comments.filter(comment => comment.post === post.id);
    }
  },

  Comment: {
    post(comment) {
      return db.posts.find(post => post.id === comment.post);
    },
    author(comment) {
      return db.users.find(user => user.id === comment.author);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
