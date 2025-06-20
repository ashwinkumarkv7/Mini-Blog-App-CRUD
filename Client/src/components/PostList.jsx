import React, { useState } from 'react';

function PostList({ posts, onDelete, onUpdate }) {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await onUpdate(editingPostId, editTitle, editContent);
    cancelEdit();
  };

  return (
    <div className="space-y-4 mt-6">
      {posts.map((post) => (
        <div key={post._id} className="border p-4 rounded shadow">
          {editingPostId === post._id ? (
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                className="border p-2 w-full"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="border p-2 w-full"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
                  Save
                </button>
                <button type="button" onClick={cancelEdit} className="bg-gray-400 px-3 py-1 rounded">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEditing(post)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
