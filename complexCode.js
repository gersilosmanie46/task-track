// Filename: complexCode.js
// Description: This code demonstrates a complex implementation of a social media application

// User class represents a user on the social media platform
class User {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.followers = [];
    this.posts = [];
  }

  // Method to follow another user
  follow(user) {
    if (this !== user && !this.followers.includes(user))
      this.followers.push(user);
  }

  // Method to post a new message
  postMessage(message) {
    const post = new Post(this, message);
    this.posts.push(post);
  }
}

// Post class represents a post made by a user
class Post {
  constructor(author, message) {
    this.author = author;
    this.message = message;
    this.likes = 0;
    this.comments = [];
  }

  // Method to add a like to a post
  addLike() {
    this.likes++;
  }

  // Method to add a comment to a post
  addComment(comment) {
    this.comments.push(comment);
  }
}

// Comment class represents a comment made on a post
class Comment {
  constructor(author, message) {
    this.author = author;
    this.message = message;
  }
}

// Create users
const user1 = new User("John", 25, "john@example.com");
const user2 = new User("Alice", 30, "alice@example.com");
const user3 = new User("Bob", 28, "bob@example.com");

// User actions
user1.follow(user2);
user1.follow(user3);
user2.follow(user3);

user1.postMessage("Hello, everyone!");
user2.postMessage("Exciting news!");
user3.postMessage("I'm working on something cool.");

// Interactions
user2.posts[0].addLike();
user3.posts[0].addLike();
user3.posts[0].addComment(new Comment(user1, "Nice post!"));
user2.posts[0].addComment(new Comment(user3, "Keep it up!"));

// Print user information
console.log("User 1:", user1);
console.log("User 2:", user2);
console.log("User 3:", user3);
console.log("User 1's Posts:", user1.posts);
console.log("User 2's Posts:", user2.posts);
console.log("User 3's Posts:", user3.posts);