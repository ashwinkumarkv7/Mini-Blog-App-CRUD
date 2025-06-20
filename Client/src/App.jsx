import React, { useEffect, useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './App.css';


function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/posts/${id}`, { method: 'DELETE' });
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleUpdate = async (id, title, content) => {
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const updatedPost = await res.json();
      setPosts((prev) =>
        prev.map((post) => (post._id === id ? updatedPost : post))
      );
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Mini Blog</h1>
      <PostForm onPostAdded={handlePostAdded} />
      <PostList posts={posts} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
