import React, { useEffect, useState } from "react";

export const UseEffectDemo = () => {
  const [count, setcount] = useState(0);
  useEffect(() => {
    console.log("use effect called");
  }, [count]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Use Effect Demo</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => {
          setcount(count + 1);
        }}
      >
        Increment
      </button>
      <br />
      {count}
    </div>
  );
};
