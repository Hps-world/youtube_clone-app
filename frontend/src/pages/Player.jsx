import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CommentItem from "../components/CommentItem";

export default function Player() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    const res = await api.get(`/videos/${id}`);
    setVideo(res.data);
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/comments/${id}`, { text: comment });
      setComment("");
      fetchVideo(); // refresh
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  const likeVideo = async () => {
    await api.post(`/videos/${id}/like`);
    fetchVideo();
  };

  const dislikeVideo = async () => {
    await api.post(`/videos/${id}/dislike`);
    fetchVideo();
  };

  if (!video) return <p>Loading...</p>;

  // Extract YouTube ID if needed
  const getYouTubeId = (url) => {
    const regex =
      /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const ytId = getYouTubeId(video.videoUrl);

  return (
    <div>
      {/* Video player */}
      {ytId ? (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${ytId}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video src={video.videoUrl} controls className="w-full mb-4" />
      )}

      {/* Video info */}
      <h1 className="text-xl font-bold mt-2">{video.title}</h1>
      <p>{video.description}</p>
      <p className="text-sm text-gray-600">
        {video.views} views • {new Date(video.createdAt).toDateString()}
      </p>

      {/* Like / Dislike buttons */}
      <div className="flex gap-4 mt-3">
        <button
          onClick={likeVideo}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          👍 Like ({video.likes || 0})
        </button>
        <button
          onClick={dislikeVideo}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          👎 Dislike ({video.dislikes || 0})
        </button>
      </div>

      {/* Comments */}
      <h2 className="mt-6 font-bold">Comments</h2>
      <form onSubmit={addComment} className="flex gap-2 mt-2">
        <input
          className="input flex-1"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="btn-primary">Post</button>
      </form>

      <div className="mt-4 space-y-2">
        {video.comments && video.comments.length > 0 ? (
          video.comments.map((c) => (
            <CommentItem
              key={c._id}
              comment={c}
              videoId={video._id}
              refresh={fetchVideo}
              currentUser={user}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
