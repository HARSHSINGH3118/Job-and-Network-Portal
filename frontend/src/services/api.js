import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach token from localStorage to every request
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// Job APIs
export const fetchJobs = () => API.get("/jobs");
export const postJob = (jobData) => API.post("/jobs", jobData);
export const fetchMyJobs = () => API.get("/jobs/user");
export const applyToJob = (jobId) => API.post("/applications/apply", { jobId });
export const getAppliedJobs = () => API.get("/applications/applied");

// ✅ Smart Suggestions (AI-powered)
export const getSmartJobSuggestions = async () => {
  const { data } = await API.get("/suggestions/jobs");

  // if Flask returned { suggestions: [...] }, pull that out,
  // otherwise assume it's already the array
  return Array.isArray(data) ? data : data.suggestions || [];
};

// ✅ Update user profile (e.g. with extracted skills)
export const updateUserProfile = (data) => API.put("/users/profile", data);
