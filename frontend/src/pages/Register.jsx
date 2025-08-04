import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import API from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", { name, email, password });
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] overflow-hidden">

      <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/40 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Your Account
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/70 placeholder-gray-600 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/70 placeholder-gray-600 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/70 placeholder-gray-600 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}


