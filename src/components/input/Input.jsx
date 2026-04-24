"use client";
import React, { useState } from "react";

function Input({ data, setData }) {
  const [skillInput, setSkillInput] = useState("");

  // 🔹 Handle simple fields
  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  // 🔹 Skills handlers
  const addSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;

    setData({
      ...data,
      skills: [...data.skills, skillInput],
    });
    setSkillInput("");
  };

  const removeSkill = (i) => {
    const updated = data.skills.filter((_, index) => index !== i);
    setData({ ...data, skills: updated });
  };

  // 🔹 Projects handlers

  const addProject = () => {
    setData({
      ...data,
      projects: [...data.projects, { title: "", desc: "", link: "" }],
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...data.projects];
    updated[index][field] = value;

    setData({ ...data, projects: updated });
  };

  const removeProject = (index) => {
    const updated = data.projects.filter((_, i) => index !== i )
    setData({...data, projects: updated});
  }

  // Social Handlers

  const handleSocial = (field, value) => {
    setData({...data, social : {...data.social, [field] : value}})
  }


  return (
    <div className="w-full md:w-1/2 space-y-6 overflow-y-auto min-h-[90vh]">
      <p className="text-2xl text-[#90A955] font-semibold ml-2">
        Fill Following Details:
      </p>

      {/* Personal Info */}
      <div className="border p-4 rounded-xl bg-[#132A13] border-white">
        <h2 className="font-bold mb-2">Personal Info</h2>

        <input
          className="w-full border py-2 px-4 mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90A955]"
          placeholder="Name"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <textarea
          className="w-full border py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90A955]"
          placeholder="Bio"
          value={data.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
        />
      </div>

      {/* Skills */}
      <div className="border p-4 rounded-xl bg-[#132A13] border-white">
        <h2 className="font-bold mb-2">Skills</h2>
        <div>
          <form onSubmit={(e) => addSkill(e)} className="flex gap-2">
            <input
              className="border py-2 px-4 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90A955]"
              placeholder="Add skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 bg-[#31572C] rounded-lg text-white hover:bg-[#132A13]"
            >
              Add
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {data.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-[#90A955] px-4 py-2 text-black rounded-lg cursor-pointer font-semibold hover:text-red-600"
              onClick={() => removeSkill(i)}
            >
              {skill} ✕
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}

      <div className="border p-4 rounded-xl bg-[#132A13] border-white">
        <h2 className="font-bold mb-2">Projects</h2>
        {data.projects.map((project, index) => (
          <div
            key={index}
            className="border-3 border-white p-4 rounded-xl mb-4 flex flex-col gap-3"
          >
            <input
              placeholder="title"
              value={project.title}
              onChange={(e) => updateProject(index, "title", e.target.value)}
              className="border py-2 px-4 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90A955]"
            />
            <input
              placeholder="description"
              value={project.description}
              onChange={(e) =>
                updateProject(index, "description", e.target.value)
              }
              className="border py-2 px-4 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90A955]"
            />
            <input
              placeholder="link"
              value={project.link}
              onChange={(e) => updateProject(index, "link", e.target.value)}
              className="border py-2 px-4 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90A955]"
            />
            <button
              onClick={() => removeProject(index)}
              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-800 self-end"
            >
              Remove Project
            </button>
          </div>
        ))}
        <button
          className="px-4 py-2 bg-[#31572C] rounded-lg text-white hover:bg-[#132A13]"
          onClick={addProject}
        >
          Add Project
        </button>
      </div>

      {/* Social Links */}

      <div className="border p-4 rounded-xl bg-[#132A13] border-white">
        <h2 className="font-bold mb-2">Social Links</h2>
        <div className="flex flex-col gap-3">
        <input type="text" placeholder="GitHub" value={data.social.github} onChange={e => handleSocial("github", e.target.value)} className="border py-2 px-4 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90A955]"/>
        <input type="text" placeholder="LinkedIn" value={data.social.linkedin} onChange={e => handleSocial("linkedin", e.target.value)} className="border py-2 px-4 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90A955]"/>
        </div>
      </div>

    </div>
  );
}

export default Input;
