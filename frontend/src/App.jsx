import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Upload from "./pages/Upload";
import Player from "./pages/Player";
import Channel from "./pages/Channel";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        {/* Sidebar visible only if sidebarOpen is true */}
        {sidebarOpen && <Sidebar />}
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/video/:id" element={<Player />} />
            <Route path="/channel/:id" element={<Channel />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
