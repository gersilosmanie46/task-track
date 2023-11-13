```javascript
// filename: complexApp.js

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize an instance of Express app
const app = express();

// Enable body parsing for JSON requests
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a mongoose schema for User
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// Create a model based on the user schema
const User = mongoose.model('User', userSchema);

// Define a route to create a new user
app.post('/users', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const user = new User({ name, age, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Define a route to get all users
app.get('/users', async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Define a route to get a user by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Define a route to update a user by id
app.put('/users/:id', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, age, email }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Define a route to delete a user by id
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

This code is a sophisticated and elaborate example of a backend application built using Node.js, Express.js, and MongoDB. It sets up an Express server, connects to a MongoDB database, defines routes for CRUD operations on a "User" model, and listens for incoming requests on port 3000.