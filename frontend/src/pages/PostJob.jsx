import React, { useState } from "react";
import { postJob } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = skills.split(",").map((s) => s.trim());
      await postJob({
        title,
        description,
        skills: skillsArray,
        budget,
        location,
      });
      navigate("/jobs");
    } catch (err) {
      console.error("Failed to post job", err);
    }
  };

  return (
    <div className=" flex items-center justify-center text-black px-4">
      <div className="w-full max-w-xl bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Post a Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            className="w-full p-3 rounded-md bg-white border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Job Description"
            className="w-full p-3 rounded-md bg-white border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="w-full p-3 rounded-md bg-white border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <input
            type="number"
            placeholder="Budget"
            className="w-full p-3 rounded-md bg-white border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 rounded-md bg-white border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
