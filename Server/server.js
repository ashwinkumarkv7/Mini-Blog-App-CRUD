const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/Post'); // your Mongoose model

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/logapp')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));



// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // newest first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: 'Invalid post data' });
  }
});

// Update a post
app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } // return updated doc
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update post' });
  }
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.sendStatus(204); // No content
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete post' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
