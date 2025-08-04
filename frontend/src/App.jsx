import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import Navbar from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext.jsx";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import ResumeSkills from "./pages/ResumeSkills";
import SmartSuggestions from "./pages/SmartSuggestions";

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const layoutStyles = isAuthPage
    ? "w-full min-h-screen p-0"
    : "ml-64 w-full min-h-screen p-6";

  return (
    <div className="flex bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-black min-h-screen w-full">
      {!isAuthPage && <Navbar />}

      <main className={layoutStyles}>
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/post-job"
            element={user ? <PostJob /> : <Navigate to="/login" />}
          />
          <Route
            path="/jobs"
            element={user ? <Jobs /> : <Navigate to="/login" />}
          />
          <Route
            path="/resume-skills"
            element={user ? <ResumeSkills /> : <Navigate to="/login" />}
          />
          <Route
            path="/smart-suggestions"
            element={user ? <SmartSuggestions /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
