// ✅ Updated Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center text-gray-800">
      <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
        Job Portal
      </Link>
      <div className="ml-auto flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/jobs" className="hover:text-blue-500 font-medium">
              Jobs
            </Link>
            <Link to="/post-job" className="hover:text-blue-500 font-medium">
              Post Job
            </Link>
            <Link
              to="/resume-skills"
              className="hover:text-blue-500 font-medium"
            >
              Resume Skills
            </Link>
            <Link to="/profile" className="hover:text-blue-500 font-medium">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-500 font-medium">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-500 font-medium">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
