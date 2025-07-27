import axios from "axios";
import React, { useEffect, useState } from "react";
import Li from "./Li";

const PendingList = () => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let getData = async () => {
    try {
      setLoading(true);
      let res = await axios("http://localhost:3000/tasks?status=pending");
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

   if (loading) return <p className="text-xl animate-pulse">Loading...</p>;
   if(data.length===0) return <p className="text-xl">No Pending Tasks</p>
  return (
    <ul className="px-3">
      {data.map((task) => (
        <Li task={task} key={task.id} getData={getData} />
      ))}
    </ul>
  );
};

export default PendingList;
