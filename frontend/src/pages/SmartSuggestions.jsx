import React, { useEffect, useState } from "react";
import { getSmartJobSuggestions } from "../services/api";

export default function SmartSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 6;
  const totalPages = Math.ceil(suggestions.length / jobsPerPage);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // now returns an array
        const aiJobs = await getSmartJobSuggestions();
        setSuggestions(aiJobs);
      } catch (err) {
        console.error("Smart Suggestion Error:", err);
        alert("Failed to fetch smart job suggestions. Try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = suggestions.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="p-6  text-white">
      <h1 className="text-3xl text-yellow-800 font-bold mb-6">
        AI-Powered Job Recommendations
      </h1>

      {loading ? (
        <p>Loading suggestions...</p>
      ) : currentJobs.length === 0 ? (
        <p>No job suggestions found based on your profile.</p>
      ) : (
        <>
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="border border-yellow-800 p-4 rounded-lg bg-white"
              >
                <h2 className="text-xl text-yellow-800 font-bold">
                  {job.title}
                </h2>
                <p className="text-lg text-yellow-600 font-semibold mt-1">
                  {job.description}
                </p>
                <p className="mt-2 text-yellow-800 text-sm">
                  Match Score:{" "}
                  <span className="font-semibold">{job.score.toFixed(2)}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              className="px-4 py-2 bg-yellow-300 rounded text-yellow-800 font-bold disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-yellow-800 mt-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-yellow-300  rounded text-yellow-800 font-bold disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
