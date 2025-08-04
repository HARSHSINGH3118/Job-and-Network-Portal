import mongoose from "mongoose";
import Application from "../models/applicationModel.js";
import Job from "../models/Job.js";

export const applyToJob = async (req, res) => {
  const {
    jobId,
    fullName,
    personalEmail,
    collegeEmail,
    experience,
    skills,
    resume,
  } = req.body;

  try {
    // ✅ Validate jobId
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid or missing Job ID" });
    }

    // ✅ Check if already applied
    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    // ✅ Create the new application
    const newApplication = await Application.create({
      job: new mongoose.Types.ObjectId(jobId),
      applicant: req.user._id,
      fullName,
      personalEmail,
      collegeEmail,
      experience,
      skills,
      resume,
    });

    res
      .status(201)
      .json({ message: "Application submitted", application: newApplication });
  } catch (err) {
    console.error("Apply Error:", err);
    res.status(500).json({ message: "Application failed" });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    }).populate("job");

    const jobs = applications.map((a) => a.job);
    res.json(jobs);
  } catch (err) {
    console.error("Get Applied Jobs Error:", err);
    res.status(500).json({ message: "Failed to load applied jobs" });
  }
};
