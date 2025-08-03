// ✅ Register.jsx with Toned-Down Animation

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import API from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);

  const handleMouseMove = (e) => {
    // Gentle zoom effect only
    setScale(1.01);
  };

  const handleMouseLeave = () => {
    setScale(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", { name, email, password });
      login(res.data);

      const form = document.querySelector("form");
      form.classList.add("fade-out");

      setTimeout(() => {
        navigate("/dashboard");
      }, 400);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    const container = document.getElementById("register-container");
    container?.addEventListener("mousemove", handleMouseMove);
    container?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      id="register-container"
      className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center px-4 overflow-hidden transition-colors duration-300"
    >
      <form
        onSubmit={handleSubmit}
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.3s ease",
        }}
        className="transition-all bg-white/70 backdrop-blur-md border border-gray-300 rounded-2xl shadow-2xl p-8 w-full max-w-md z-10"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create an account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center border border-red-200">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-white"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
