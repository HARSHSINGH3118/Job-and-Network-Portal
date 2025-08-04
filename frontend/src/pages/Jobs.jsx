import React, { useEffect, useState } from "react";
import { fetchJobs } from "../services/api";
import toast from "react-hot-toast";
import JobCard from "../components/JobCard";
import ApplyModal from "../components/ApplyModal";
import { useSkills } from "../contexts/SkillContext";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { extractedSkills } = useSkills();
  const jobsPerPage = 6;

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetchJobs();
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    loadJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job); // ✅ Pass full job
    setShowApplyModal(true);
  };

  const handleSuccessfulApply = (jobId) => {
    setAppliedJobs((prev) => new Set(prev).add(jobId));
    toast.success("Application submitted");
    setShowApplyModal(false);
  };

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 py-12 px-6 text-gray-900">
      <h2 className="text-4xl font-bold mb-10 text-center text-blue-800">
        🔍 Explore Jobs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job} // ✅ Pass the full job object
            onApply={handleApplyClick}
            extractedSkills={extractedSkills}
            isApplied={appliedJobs.has(job._id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg font-medium border transition-all duration-150 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {showApplyModal && selectedJob && (
        <ApplyModal
          job={selectedJob} // ✅ full job object passed
          onClose={() => setShowApplyModal(false)}
          onSuccess={handleSuccessfulApply}
        />
      )}
    </div>
  );
}
