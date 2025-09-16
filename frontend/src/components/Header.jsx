// import { Link, useNavigate } from "react-router-dom";
// import { Home, Upload, LogIn, LogOut, Search } from "lucide-react";

// export default function Header() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/auth");
//   };

//   return (
//     <header className="bg-yt-red text-white bg-red-700 p-4 flex justify-between items-center shadow">
//       {/* Left: Logo */}
//       <Link to="/" className="text-xl font-bold flex items-center gap-2">
//         <Home className="w-6 h-6" />
//         YouTube Clone
//       </Link>

//       {/* Center: Search */}
//       <div className="flex-1 mx-4 flex items-center bg-white rounded px-2">
//         <Search className="w-5 h-5 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full px-2 py-1 text-black outline-none"
//         />
//       </div>

//       {/* Right: Auth buttons */}
//       <nav className="flex items-center gap-4">
//         {user ? (
//           <>
//             <Link to="/upload" className="flex items-center gap-1 hover:underline">
//               <Upload className="w-5 h-5" /> Upload
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-1 bg-red-400 text-yt-red px-3 py-1 rounded hover:bg-black transition"
//             >
//               <LogOut className="w-5 h-5" /> Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/auth" className="flex items-center gap-1 hover:underline">
//             <LogIn className="w-5 h-5" /> Login
//           </Link>
//         )}
//       </nav>
//     </header>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { Home, Upload, LogIn, LogOut, Search, Menu } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <header className="bg-yt-red text-white bg-red-600 p-4 flex justify-between items-center shadow">
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <Home className="w-6 h-6" />
          YouTube Clone
        </Link>
      </div>

      {/* Center: Search */}
      <div className="flex-1 mx-4 flex items-center bg-white rounded px-2">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="w-full px-2 py-1 text-black outline-none"
        />
      </div>

      {/* Right: Auth buttons */}
      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/upload" className="flex items-center gap-1 hover:underline">
              <Upload className="w-5 h-5" /> Upload
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1  text-yt-red px-3 py-1 rounded hover:bg-black transition"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="flex items-center gap-1 hover:underline">
            <LogIn className="w-5 h-5" /> Login
          </Link>
        )}
      </nav>
    </header>
  );
}
