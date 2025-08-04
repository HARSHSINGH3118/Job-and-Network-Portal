import React, { useState } from "react";
import { applyToJob } from "../services/api";
import toast from "react-hot-toast";

export default function ApplyModal({ job, onClose, onSuccess }) {
  const [form, setForm] = useState({
    fullName: "",
    personalEmail: "",
    collegeEmail: "",
    experience: "",
    skills: "",
    resume: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job?._id) {
      toast.error("Invalid job ID");
      console.error("🚨 Invalid job object received in ApplyModal:", job);
      return;
    }

    const payload = {
      jobId: job._id, // ✅ Ensure only ID is passed
      fullName: form.fullName,
      personalEmail: form.personalEmail,
      collegeEmail: form.collegeEmail,
      experience: form.experience,
      skills: form.skills.split(",").map((s) => s.trim()),
      resume: form.resume,
    };

    console.log("📤 Submitting payload:", payload);

    try {
      await applyToJob(payload);
      toast.success("Applied successfully");
      onSuccess?.(); // Refresh parent if needed
      onClose(); // Close modal
    } catch (err) {
      console.error("❌ Apply Error:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
          Apply for {job?.title || "this job"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="personalEmail"
            placeholder="Personal Email"
            type="email"
            value={form.personalEmail}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="collegeEmail"
            placeholder="College Email"
            type="email"
            value={form.collegeEmail}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="experience"
            placeholder="Years of Experience"
            value={form.experience}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="skills"
            placeholder="Your Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="resume"
            placeholder="Resume Link (Drive or PDF URL)"
            value={form.resume}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
