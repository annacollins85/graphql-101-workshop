import { DataSource } from "apollo-datasource";

export class DB extends DataSource {
  constructor(db) {
    super();
    this.db = db;
  }

  initialize({ context }) {
    this.context = context;
  }

  getUsers() {
    return this.db.users
  }

  getUser(id) {
    return this.db.users.find(user => user.id === id)
  }

  getUserByEmail(email) {
    return this.db.users.find(user => user.email === email)
  }

  createUser(user) {
    return this.db.users.push(user)
  }

  getUserPosts(userId) {
    return this.db.posts.filter(post => post.author === userId)
  }

  getUserComments(userId) {
    return this.db.comments.filter(comment => comment.author === userId)
  }

  getPosts() {
    return this.db.posts
  }

  getPost(id) {
    return this.db.posts.find(post => post.id === id)
  }

  createPost(post) {
    return this.db.posts.push(post)
  }

  getPostComments(postId) {
    return this.db.comments.filter(comment => comment.post === postId)
  }

  createComment(comment) {
    return this.db.comments.push(comment)
  }

}
