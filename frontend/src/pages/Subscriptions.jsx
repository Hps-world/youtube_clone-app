import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

export default function Subscriptions() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("/channels/subscriptions/feed")
      .then((res) => setVideos(res.data))
      .catch(() => setVideos([]));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <Link key={video._id} to={`/video/${video._id}`}>
              <VideoCard video={video} />
            </Link>
          ))
        ) : (
          <p>No subscribed videos yet.</p>
        )}
      </div>
    </div>
  );
}
