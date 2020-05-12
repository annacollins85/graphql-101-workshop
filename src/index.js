import { ApolloServer, gql } from 'apollo-server'
import uuid from 'uuid/v4'
import db from "./db"

const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
    user(id: ID!): User
    post(id: ID!): Post
  }
  type Mutation {
    createUser(data: CreateUserInput!): User!
    createPost(data: CreatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    post: ID!
    author: ID!
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
    author: User!
    post: Post!
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
    },
    post(_, args) {
      return db.posts.find(post => post.id === args.id)
    }
  },
  Mutation: {
		createUser (_, { data }) {
      const emailTaken = db.users.find(user => user.email === data.email)
      if (emailTaken) {
        throw new Error('Email already taken')
      }

      const user = {
        id: uuid(),
        email: data.email,
        name: data.name,
        age: data.age
      }
      db.users.push(user)

      return user
    },
    createPost(_, { data }) {
      const author = db.users.find(user => user.id === data.author)
      if (!author) {
        throw new Error(`No user found for ID ${data.author}`)
      }
      const post = {
        id: uuid(),
        title: data.title,
        body: data.body,
        published: data.published,
        author: data.author
      }
      db.posts.push(post)
      
      return post
    },
    createComment(_, { data }) {
      const author = db.users.find(user => user.id === data.author)
      if (!author) {
        throw new Error(`No user found for ID ${data.author}`)
      }
      const post = db.posts.find(post => post.id === data.post)
      if (!post) {
        throw new Error(`No post found for ID ${data.post}`)
      }
      const comment = {
        id: uuid(),
        text: data.text,
        post: data.post,
        author: data.author
      }
      db.comments.push(comment)

      return comment
    }
	},
  User: {
    posts(user) {
      return db.posts.filter(post => post.author === user.id)
    },
    comments(user) {
      return db.comments.filter(comment => comment.author === user.id)
    }
  },

  Post: {
    author(post) {
      return db.users.find(user => user.id === post.author)
    },
    comments(post) {
      return db.comments.filter(comment => comment.post === post.id)
    }
  },

  Comment: {
    post(comment) {
      return db.posts.find(post => post.id === comment.post)
    },
    author(comment) {
      return db.users.find(user => user.id === comment.author)
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
