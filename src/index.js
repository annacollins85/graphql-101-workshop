import { ApolloServer, gql } from 'apollo-server'
import db from "./db"

const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
    user(id: ID!): User
  }

  type User {
    name: String!
    email: String!
    age: Int
    id: ID!
  }

  type Post {
    title: String!
    body: String!
    id: ID!
    published: Boolean!
    author: User!
  }
`

const resolvers = {
  Query: {
    users() {
      return db.users
    },
    posts() {
      return db.posts
    },
    user(_, args) {
      return db.users.find(user => user.id === args.id)
    }
  },

  Post: {
    author(post) {
      return db.users.find(user => user.id === post.author)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
