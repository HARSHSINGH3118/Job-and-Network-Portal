import React from "react";
import PERSON from "../assets/PERSON.jpg";
import WORK from "../assets/WORK.jpg";

export default function Dashboard() {
  return (
    <div className="relative bg-gradient-to-br from-white via-yellow-50 to-yellow-100 text-black overflow-hidden flex flex-col lg:flex-row items-center justify-between px-8 py-12 ">
      {/* Left Section: Text */}
      <div className="lg:max-w-[50%] text-center lg:text-left mb-12 lg:mb-0">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-yellow-700 drop-shadow">
          Crafting the Future in the Streets of AI & Web Dev
        </h1>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Welcome to the{" "}
          <span className="font-semibold">Job & Network Portal</span>, where
          innovation meets execution. From AI-powered tools to full-stack
          development pipelines, we're empowering creators, coders, and dreamers
          to build, deploy, and scale their ideas.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Whether you're mastering frontend finesse, optimizing backend
          performance, integrating LLMs, or deploying smart contracts — this is
          your playground. And your resume? Let AI handle that too.
        </p>

        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-200">
          Start Building
        </button>
      </div>

      {/* Right Section: Hero Image */}
      <div className="relative z-10 lg:mr-[-1rem]">
        <img
          src={PERSON}
          alt="Full stack dev"
          className="w-[380px] lg:w-[440px] h-auto object-cover rounded-xl shadow-lg border border-yellow-200"
        />
      </div>

      {/* Decorative Icon */}
      <img
        src={WORK}
        alt="Work Icon"
        className="absolute bottom-4 right-4 w-[90px] lg:w-[110px] h-auto opacity-70"
      />
    </div>
  );
}
