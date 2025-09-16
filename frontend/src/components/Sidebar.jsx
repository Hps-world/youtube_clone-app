import { Link } from "react-router-dom";
import { Home, Flame, PlaySquare, Music, Gamepad2, Newspaper } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-56 bg-gray-100 p-4 hidden md:block shadow-inner">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center gap-3 hover:text-yt-red">
            <Home size={20} /> Home
          </Link>
        </li>
        <li>
          <Link to="/category/Trending" className="flex items-center gap-3 hover:text-yt-red">
            <Flame size={20} /> Trending
          </Link>
        </li>
        <li>
          <Link to="/subscriptions" className="flex items-center gap-3 hover:text-yt-red">
            <PlaySquare size={20} /> Subscriptions
          </Link>
        </li>
        <li>
          <Link to="/category/Music" className="flex items-center gap-3 hover:text-yt-red">
            <Music size={20} /> Music
          </Link>
        </li>
        <li>
          <Link to="/category/Gaming" className="flex items-center gap-3 hover:text-yt-red">
            <Gamepad2 size={20} /> Gaming
          </Link>
        </li>
        <li>
          <Link to="/category/News" className="flex items-center gap-3 hover:text-yt-red">
            <Newspaper size={20} /> News
          </Link>
        </li>
      </ul>

      <hr className="my-4" />

      <ul className="space-y-4">
        <li>
          <Link to="/upload" className="flex items-center gap-3 hover:text-yt-red">
            ➕ Upload
          </Link>
        </li>
        <li>
          <Link to="/auth" className="flex items-center gap-3 hover:text-yt-red">
            🔑 Login / Signup
          </Link>
        </li>
        <Link to="/subscriptions" className="flex items-center gap-3 hover:text-yt-red">
            <PlaySquare size={20} /> Subscriptions
        </Link>
      </ul>
      
    </aside>
  );
}
