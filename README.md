# GraphQL 101 Workshop

## Setup

1. Fork repo
2. Clone repo from your repositories
3. run `npm install`

## Instructions

# Part 1

1. Run `npm start` and visit `http://localhost:4000/`
2. Run a query to fetch the `name` and `email` for all users
3. Run a query to fetch the `title` and `author` for all posts and for each author return their `name` and `id`
4. Add the field `posts` to the `User` type in the `typeDefs`, what type should it return?
5. Add a resolver for `posts` on the `User` type
6. Create a new type, `Comment` with fields `id`, `text`, `post` and `author`
7. Add some fake comment data to the database file
8. Add resolvers for the necessary fields on the `Comment` type
9. Add a `comments` field to `User` and `Post` in `typeDefs` and add the required resolvers
10. Add a query to fetch a `Post` given an `id` as a parameter
11. Make some queries for your new types

# Part 2

1. Try creating some users
2. Create a new mutation `createPost` with the required arguments
3. Create a resolver for `createPost`. Make sure to check that an author exists for the author id argument.
4. If you haven't used an `input` type in the `typeDefs`, refactor your code to use one.
5. Test your code by creating some posts. (Remember, since we are not writing to a database or file, once you refresh the server, the newly created users will have disappeared)
6. Repeat steps 1 to 4 for `createComment`
