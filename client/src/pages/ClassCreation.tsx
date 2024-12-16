import axios from "axios";
import { backendUrl } from "../config";
import { useState } from "react";

function ClassCreation() {
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");
  const createClass = async () => {
    await axios.post(
      `${backendUrl}/class/create`,
      { title: title },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      }
    );
    setTitle("");
    alert("Class created successfully!");
    window.location.reload();
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <section className="w-[50%] bg-slate-200 border-[1px] h-28 p-8 relative top-5 shadow-2xl rounded-lg">
        <h1 className="font-semibold text-2xl">Title</h1>
        <input
          type="text"
          placeholder="Class Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 rounded-lg"
        />
        <button
          onClick={createClass}
          className="bg-slate-700  rounded-xl w-16 text-white"
        >
          Create
        </button>
      </section>
    </div>
  );
}

export default ClassCreation;
