import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-55 h-screen fixed top-0 left-0 bg-black text-white border-r shadow-md flex flex-col">
      {/* Brand Title */}
      <div className="p-6">
        <Link to="/dashboard" className="text-2xl text-yellow-400 font-bold">
          Job Portal
        </Link>
      </div>

      {/* Main nav links */}
      <div className="flex-1 flex flex-col items-start justify-center gap-6 pl-6">
        {user ? (
          <>
            <Link to="/jobs" className="hover:text-yellow-300 font-bold">
              Jobs
            </Link>
            <Link to="/post-job" className="hover:text-yellow-300 font-bold">
              Post Job
            </Link>
            <Link
              to="/resume-skills"
              className="hover:text-yellow-300 font-bold"
            >
              Resume Skills
            </Link>
            <Link
              to="/smart-suggestions"
              className="hover:text-yellow-300 font-bold"
            >
              Smart Suggestions
            </Link>
            <Link to="/profile" className="hover:text-yellow-300 font-bold">
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-300 font-bold">
              Login
            </Link>
            <Link to="/register" className="hover:text-yellow-300 font-bold">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Logout button at bottom */}
      <div className="p-4">
        {user && (
          <button
            onClick={logout}
            className="text-white hover:text-red-500 font-bold"
          >
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
