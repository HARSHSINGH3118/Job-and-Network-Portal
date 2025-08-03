// ✅ Updated ResumeSkills.jsx
import React from "react";
import ResumeSkillExtractor from "../components/ResumeSkillExtractor";

export default function ResumeSkills() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h2 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <span role="img" aria-label="brain">
          🧠
        </span>
        Resume Skill Extractor
      </h2>
      <ResumeSkillExtractor />
    </div>
  );
}
