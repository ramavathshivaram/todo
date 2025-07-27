import axios from "axios";
import React, { useEffect, useState } from "react";
import Li from "./Li";

const SkippedList = () => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let getData = async () => {
    try {
      setLoading(true);
      let res = await axios("http://localhost:3000/tasks?status=skipped");
      if (!Array.isArray(res.data)) {
        console.error('Invalid data format received');
        setData([]);
        return;
      }
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) return <p className="text-xl animate-pulse" style={{ color: '#ffffff' }}>Loading...</p>;
  if (data.length === 0) return <p className="text-xl" style={{ color: '#ffffff' }}>No Skipped Tasks</p>;
  return (
    <ul className="px-3" style={{ backgroundColor: '#00171f' }}>
      {data.map((task) => (
        <Li task={task} key={task.id} getData={getData} />
      ))}
    </ul>
  );
};

export default SkippedList;
