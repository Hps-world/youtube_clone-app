import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "Education",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/videos", form);
      alert("Video uploaded successfully!");
      navigate(`/video/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Upload Video</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="input"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          className="input"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="input"
          placeholder="Thumbnail URL"
          name="thumbnailUrl"
          value={form.thumbnailUrl}
          onChange={handleChange}
        />
        <input
          className="input"
          placeholder="Video URL"
          name="videoUrl"
          value={form.videoUrl}
          onChange={handleChange}
        />
        <select
          className="input"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option>Education</option>
          <option>Music</option>
          <option>Sports</option>
          <option>Gaming</option>
          <option>News</option>
          <option>Entertainment</option>
        </select>
        <button type="submit" className="btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
}
