// models/applicationModel.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  personalEmail: {
    type: String,
    required: true,
  },
  collegeEmail: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
