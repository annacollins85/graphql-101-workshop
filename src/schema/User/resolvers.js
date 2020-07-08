import uuid from 'uuid/v4'

const resolvers = {
  Query: {
    users(_, __, { dataSources }) {
      return dataSources.db.getUsers()
    },
    user(_, args, { dataSources }) {
      return dataSources.db.getUser(args.id)
    }
  },
  Mutation: {
		createUser (_, { data }, { dataSources }) {
      const existingUser = dataSources.db.getUserByEmail(email)
      if (existingUser) {
        throw new Error('Email already taken')
      }

      const user = {
        id: uuid(),
        email: data.email,
        name: data.name,
        age: data.age
      }
      dataStores.db.createUser(user)

      return user
    }
  },
  User: {
    posts(user, _, { dataSources }) {
      return dataSources.db.getUserPosts(user.id)
    },
    comments(user, _, { dataSources }) {
      return dataSources.db.getUserComments(user.id)
    }
  }
}

export default resolvers;
