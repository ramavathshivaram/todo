import React, { useState } from "react";
import DeleteIcon from "./DeleteIcon";
import Edit from "./Edit";

const Li = ({ task, getData }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);

  const handleSave = async () => {
    // Assuming you're using a backend API to update
    try {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task, title, desc }),
      });
      getData(); // refresh the task list
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDesc(task.desc);
    setEditMode(false);
  };

  if (editMode)
    return (
      <li className="my-2 p-4 rounded-xl bg-[#003459]/20 backdrop-blur-sm border border-[#007ea7]/30" key={task.id}>
        <h1 className="text-xl mb-2 font-medium text-[#00a8e8]">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent p-1 outline-none"
          />
        </h1>
        <p className="text-gray-300 text-sm rounded">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-transparent p-1 outline-none"
          />
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#007ea7] hover:bg-[#00a8e8] text-white"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-[#003459] hover:bg-[#007ea7] text-white"
          >
            Cancel
          </button>
        </div>
      </li>
    );

  return (
    <li
      className="flex justify-between items-center bg-[#003459]/20 backdrop-blur-sm border border-[#007ea7]/30 my-2 p-4 rounded-xl"
      key={task.id}
    >
      <div>
        <h1 className="text-xl mb-2">{task.title}</h1>
        <p className="text-gray-300 text-sm">{task.desc}</p>
      </div>
      <div className="h-15 flex flex-col justify-between">
        <DeleteIcon id={task.id} getData={getData} />
        <Edit setEditMode={setEditMode} />
      </div>
    </li>
  );
};

export default Li;
