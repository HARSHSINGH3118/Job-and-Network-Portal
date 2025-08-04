import React from "react";
import { useSkills } from "../contexts/SkillContext";

// Calculate match score based on extracted skills
const getMatchScore = (jobSkills, userSkills) => {
  if (!userSkills?.length || !jobSkills?.length) return 0;

  // Normalize casing
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
    <div className="bg-white-800 rounded-xl p-4 border-3 border-black-900">
      <h3 className="text-xl font-bold">{job.title}</h3>
      <p className="text-l text-gray-700">
        By {job.createdBy?.name || "Unknown"}
      </p>
      <p className="mt-2">{job.description}</p>
      <p className="mt-1 text-sm text-gray-700">
        Budget: ₹{job.budget} | Location: {job.location || "Not specified"}
      </p>

      <div className="mt-4 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-yellow-200 text-black-800 text-l rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        {onApply && (
          <button
            onClick={() => onApply(job._id)}
            className="px-4 py-1 bg-green-200 hover:bg-green-300 text-black text-l rounded-full ml-2 mt-2"
          >
            Apply
          </button>
        )}
      </div>

      {onApply && (
        <p className="text-l text-red-400 mt-3">Match Score: {matchScore}%</p>
      )}
    </div>
  );
}
