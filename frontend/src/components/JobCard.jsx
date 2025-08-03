import React from "react";

export default function JobCard({ job, onApply, extractedSkills, hideScore }) {
  const matchCount = job.skills.filter((skill) =>
    extractedSkills?.some((s) => s.toLowerCase() === skill.toLowerCase())
  ).length;

  const matchScore =
    job.skills.length > 0
      ? Math.round((matchCount / job.skills.length) * 100)
      : 0;

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 transition-transform hover:scale-[1.02] duration-300">
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
        <p className="text-sm text-gray-500">
          By{" "}
          <span className="font-medium">
            {job.createdBy?.name || "Unknown"}
          </span>
        </p>
      </div>

      <p className="text-gray-700 mt-2">{job.description}</p>
      <p className="text-sm text-gray-500 mt-1">
        💸 Budget: ₹{job.budget} &nbsp;|&nbsp; 📍 Location:{" "}
        {job.location || "Not specified"}
      </p>

      <div className="mt-4 flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full shadow-sm border border-blue-100"
            >
              {skill}
            </span>
          ))}
        </div>
        {onApply && (
          <button
            onClick={() => onApply(job._id)}
            className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full shadow-md transition-all"
          >
            Apply
          </button>
        )}
      </div>

      {!hideScore && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-purple-600">
            🧠 Match Score:{" "}
            <span className="text-purple-800">{matchScore}%</span>
          </p>
        </div>
      )}
    </div>
  );
}
