import api from "../services/api";

export default function VideoCard({ video, refresh, currentUser }) {
  const handleDelete = async () => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await api.delete(`/videos/${video._id}`);
      refresh(); // refresh parent page after deletion
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete video");
    }
  };

  return (
    <div className="card overflow-hidden relative">
      <img
        src={
          video.thumbnailUrl ||
          `https://img.youtube.com/vi/${video.videoUrl?.split("v=")[1]}/hqdefault.jpg`
        }
        alt={video.title}
        className="w-full h-40 object-cover"
      />
      <h3 className="font-semibold mt-2">{video.title}</h3>
      <p className="text-sm text-gray-600">
        {video.channelId?.channelName || "Unknown"} • {video.views} views
      </p>

      {/* Show delete button only if user owns the video */}
      {currentUser && currentUser._id === video.channelId?.owner && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
}
