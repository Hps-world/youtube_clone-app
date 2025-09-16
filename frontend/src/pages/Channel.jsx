import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

export default function Channel() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchChannel = async () => {
    const res = await api.get(`/channels/${id}`);
    setChannel(res.data);
  };

  useEffect(() => {
    fetchChannel();
  }, [id]);

  if (!channel) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">{channel.channelName}</h1>
          <p>{channel.description}</p>
          <p className="text-sm text-gray-600">
            {channel.subscribers} subscribers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {channel.videos && channel.videos.length > 0 ? (
          channel.videos.map((video) => (
            <Link key={video._id} to={`/video/${video._id}`}>
              <VideoCard
                video={video}
                refresh={fetchChannel}
                currentUser={user}
              />
            </Link>
          ))
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
