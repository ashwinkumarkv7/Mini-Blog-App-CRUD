import React, { useState } from 'react';

function PostForm({ onPostAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      const newPost = await response.json();
      console.log('Post added:', newPost);
      onPostAdded(newPost);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Failed to add post:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Add Post
      </button>
    </form>
  );
}

export default PostForm;
