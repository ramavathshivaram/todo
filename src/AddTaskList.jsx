import React from "react";
import { useForm } from "react-hook-form";

const AddTaskList = ({ setAddTask }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: "", desc: "" },
  });

  const onSubmit = async (formData) => {
    const modifiedData = { ...formData, status: "pending" };
    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST", // Changed from PUT to POST
        body: JSON.stringify(modifiedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Unable to fetch");
      console.log("Task added successfully");
      reset(); // Clear the form
      setAddTask(false); // Close the modal
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 backdrop-blur-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="task-list-container p-6 space-y-6 min-w-[400px]"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-2xl">
            Task name
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: true })}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="desc" className="text-2xl">
            Task description
          </label>
          <textarea
            id="desc"
            {...register("desc", { required: true })}
            className="w-full resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#007ea7] text-white py-3 rounded-lg hover:bg-[#00a8e8] font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTaskList;
