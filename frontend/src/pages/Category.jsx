import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

export default function Category() {
  const { name } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (name === "Trending") {
      // sort by views for trending
      api.get("/videos").then((res) => {
        const sorted = [...res.data.data].sort((a, b) => b.views - a.views);
        setVideos(sorted);
      });
    } else {
      api.get(`/videos?category=${name}`).then((res) => {
        setVideos(res.data.data);
      });
    }
  }, [name]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <Link key={video._id} to={`/video/${video._id}`}>
              <VideoCard video={video} />
            </Link>
          ))
        ) : (
          <p>No videos in {name}.</p>
        )}
      </div>
    </div>
  );
}
