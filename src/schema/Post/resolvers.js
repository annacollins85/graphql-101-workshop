import uuid from 'uuid/v4'

const resolvers = {
  Query: {
    posts(_, __, { dataSources }) {
      return dataSources.db.getPosts()
    },
    post(_, args, { dataSources }) {
      return dataSources.db.getPost(args.id)
    }
  },
  Mutation: {
    createPost(_, { data }, { dataSources, pubsub }) {
      const author = dataSources.db.getUser(data.author)
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
      dataSources.db.createPost(post)
      
      pubsub.publish("post", { post })
      
      return post
    },
    createComment(_, { data }, { dataSources, pubsub }) {
      const author = dataSources.db.getUser(data.author)
      if (!author) {
        throw new Error(`No user found for ID ${data.author}`)
      }
      const post = dataSources.db.getPost(data.post)
      if (!post) {
        throw new Error(`No post found for ID ${data.post}`)
      }
      const comment = {
        id: uuid(),
        text: data.text,
        post: data.post,
        author: data.author
      }
      dataSources.db.createComment(comment)

      pubsub.publish(`comment ${data.post}`, { comment })

      return comment
    }
  },
  Subscription: {
    post: {
      subscribe(_, __, { pubsub }) {
        return pubsub.asyncIterator(["post"])
      }
    },
    comment: {
      subscribe(_, { postId }, { pubsub }) {
        return pubsub.asyncIterator(`comment ${postId}`);
      }
    }
  },
  Post: {
    author(post, _, { dataSources }) {
      return dataSources.db.getUser(post.author)
    },
    comments(post, _, { dataSources }) {
      return dataSources.db.getPostComments(post.id)
    }
  },

  Comment: {
    post(comment, _, { dataSources }) {
      return dataSources.db.getPost(comment.post)
    },
    author(comment, _, { dataSources }) {
      return dataSources.db.getUser(comment.author)
    }
  }
}

export default resolvers;