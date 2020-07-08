import { DataSource } from "apollo-datasource";

export class DB extends DataSource {
  constructor(db) {
    super();
    this.db = db;
    this.cachedUsers = []
    this.cachedUsersById = {}
    this.cachedUsersByEmail = {}
    this.cachedPostsByAuthor = {}
    this.cachedCommentsByAuthor = {}
    this.cachedPosts = []
    this.cachedPostsById = {}
    this.cachedCommentsByPost = {}
  }

  initialize({ context }) {
    this.context = context;
  }

  getUsers() {
    if (this.cachedUsers.length) {
      return this.cachedUsers
    }
    const users = this.db.users
    this.cachedUsers = users
    return users
  }

  getUser(id) {
    if (this.cachedUsersById[id]) {
      return this.cachedUsersById[id]
    }
    const user = this.db.users.find(user => user.id === id)
    this.cachedUsersById[id] = user
    return user
  }

  getUserByEmail(email) {
    if (this.cachedUsersByEmail[email]) {
      return this.cachedUsersByEmail[email]
    }
    const user = this.db.users.find(user => user.email === email)
    this.cachedUsersByEmail[email] = user
    return user
  }

  createUser(user) {
    return this.db.users.push(user)
  }

  getUserPosts(userId) {
    if (this.cachedPostsByAuthor[userId]) {
      return this.cachedPostsByAuthor[userId]
    }
    const posts = this.db.posts.filter(post => post.author === userId)
    this.cachedPostsByAuthor[userId] = posts
    return posts
  }

  getUserComments(userId) {
    if (this.cachedCommentsByAuthor[userId]) {
      return this.cachedCommentsByAuthor[userId]
    }
    const comments = this.db.comments.filter(comment => comment.author === userId)
    this.cachedCommentsByAuthor[userId] = comments
    return comments
  }

  getPosts() {
    if (this.cachedPosts.length) {
      return this.cachedPosts
    }
    const posts = this.db.posts
    this.cachedPosts = posts
    return posts
  }

  getPost(postId) {
    if (this.cachedPostsById[postId]) {
      return this.cachedPostsById[postId]
    }
    const post = this.db.posts.find(post => post.id === postId)
    this.cachedPostsById[postId] = post
    return post
  }

  createPost(post) {
    return this.db.posts.push(post)
  }

  getPostComments(postId) {
    if (this.cachedCommentsByPost[postId]) {
      return this.cachedCommentsByPost[postId]
    }
    const comments = this.db.comments.filter(comment => comment.post === postId)
    this.cachedCommentsByPost[postId] = comments
    return comments
  }

  createComment(comment) {
    return this.db.comments.push(comment)
  }

}
