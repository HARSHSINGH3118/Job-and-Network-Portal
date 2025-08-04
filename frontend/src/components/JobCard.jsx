import React from "react";
import { useSkills } from "../contexts/SkillContext";

const getMatchScore = (jobSkills, userSkills) => {
  if (!userSkills?.length || !jobSkills?.length) return 0;

  const normalizedUserSkills = userSkills.map((s) => s.toLowerCase());
  const normalizedJobSkills = jobSkills.map((s) => s.toLowerCase());

  const matched = normalizedJobSkills.filter((skill) =>
    normalizedUserSkills.includes(skill)
  );
  return Math.round((matched.length / normalizedJobSkills.length) * 100);
};

export default function JobCard({ job, onApply }) {
  const { extractedSkills } = useSkills();
  const matchScore = getMatchScore(job.skills, extractedSkills);

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-yellow-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-5">
      <h3 className="text-xl font-semibold text-yellow-800 mb-1">
        {job.title}
      </h3>
      <p className="text-sm text-gray-600 mb-1">
        By {job.createdBy?.name || "Unknown"}
      </p>
      <p className="text-gray-800 mb-2">{job.description}</p>
      <p className="text-sm text-gray-600 mb-3">
        Budget: ₹{job.budget} | Location: {job.location || "Not specified"}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-yellow-300 text-yellow-800 text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {onApply && (
          <button
            onClick={() => onApply(job._id)}
            className="px-4 py-1 bg-yellow-400 hover:bg-yellow-800 text-white text-sm font-semibold rounded-full transition duration-200 shadow"
          >
            Apply
          </button>
        )}
      </div>

      {onApply && (
        <p className="text-sm font-medium text-yellow-700">
          Match Score: {matchScore}%
        </p>
      )}
    </div>
  );
}
