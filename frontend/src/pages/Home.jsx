import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchVideos = async () => {
    const res = await api.get("/videos");
    setVideos(res.data.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Link key={video._id} to={`/video/${video._id}`}>
            <VideoCard
              video={video}
              refresh={fetchVideos}
              currentUser={user}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
