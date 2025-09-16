import { useState } from "react";
import api from "../services/api";

export default function CommentItem({ comment, videoId, refresh, currentUser }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const saveEdit = async () => {
    try {
      await api.put(`/comments/${comment._id}`, { text });
      setEditing(false);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to edit comment");
    }
  };

  const deleteComment = async () => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await api.delete(`/comments/${comment._id}`);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete comment");
    }
  };

  return (
    <div className="border-b py-2">
      <p className="text-sm font-bold">{comment.user?.username || "User"}</p>

      {editing ? (
        <div className="flex gap-2 mt-1">
          <input
            className="input flex-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={saveEdit} className="btn-primary">Save</button>
          <button onClick={() => setEditing(false)} className="px-3 py-1 rounded bg-gray-300">Cancel</button>
        </div>
      ) : (
        <p className="text-sm">{comment.text}</p>
      )}

      {/* Show edit/delete only for comment owner */}
      {currentUser && currentUser._id === comment.user?._id && (
        <div className="flex gap-3 text-xs mt-1">
          <button onClick={() => setEditing(true)} className="text-blue-500">Edit</button>
          <button onClick={deleteComment} className="text-red-500">Delete</button>
        </div>
      )}
    </div>
  );
}
