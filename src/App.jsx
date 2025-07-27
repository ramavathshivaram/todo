import React, { useEffect, useState } from "react";
import CompletedList from "./CompletedList";
import PendingList from "./PendingList";
import SkippedList from "./SkippedList";
import AddTaskList from "./AddTaskList";

const App = () => {
  let [modal, setModal] = useState("complete");
  let [addTask, setAddTask] = useState(false);
  function toggleMOdal(modalName) {
    setModal((prev) => (prev === modalName ? null : modalName));
  }

  return (
    <div className="bg-[#00171f] w-screen h-screen text-white">
      <div className="p-4">
        <h1 className="text-center text-3xl font-bold text-[#00a8e8]">
          Todo App
        </h1>
      </div>
      <div className="w-full grid place-content-center">
        <div className="ring ring-[#003459] w-xl p-2 space-y-2 h-[calc(100vh-150px)] rounded-lg shadow-xl shadow-[#003459]">
          <button
            onClick={() => toggleMOdal("complete")}
            className="w-full p-3 text-lg rounded-lg text-[#00a8e8] ring"
          >
            Completed
          </button>
          {modal === "complete" && <CompletedList />}
          <button
            onClick={() => toggleMOdal("pending")}
            className="border w-full p-2 text-lg rounded-md text-[#00a8e8]"
          >
            Pending
          </button>
          {modal === "pending" && <PendingList />}
          <button
            onClick={() => toggleMOdal("skipped")}
            className="border w-full p-2 text-lg rounded-md text-[#00a8e8]"
          >
            Skipped
          </button>
          {modal === "skipped" && <SkippedList />}
          <button
            className="border w-full p-2 text-lg rounded-md text-[#00a8e8]"
            onClick={() => setAddTask(true)}
          >
            Add Task
          </button>
        </div>
      </div>
      {addTask && <AddTaskList setAddTask={setAddTask} />}
    </div>
  );
};

export default App;
