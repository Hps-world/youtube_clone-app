import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { LogIn, UserPlus, Mail, Lock } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6 text-yt-red">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="flex items-center border rounded-lg px-3 py-2">
              <UserPlus className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="ml-2 flex-1 outline-none"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex items-center border rounded-lg px-3 py-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="ml-2 flex-1 outline-none"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="ml-2 flex-1 outline-none"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yt-red text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-200 transition"
          >
            {isLogin ? (
              <>
                <LogIn className="w-5 h-5" /> Login
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" /> Register
              </>
            )}
          </button>
        </form>

        {/* Toggle link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-yt-red font-medium hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
