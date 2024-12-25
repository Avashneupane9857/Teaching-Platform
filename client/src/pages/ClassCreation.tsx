import axios from "axios";
import { backendUrl } from "../config";
import { useState } from "react";

function ClassCreation() {
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");
  const createClass = async () => {
    try {
      await axios.post(
        `${backendUrl}/class/create`,
        { title: title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      alert("Class created successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Teacher can only create classes !");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <section className="w-[50%] bg-slate-200 border-[1px] h-52 p-8 relative top-5 shadow-2xl rounded-lg">
        <h1 className="font-semibold text-2xl">Title</h1>
        <input
          type="text"
          placeholder="Class Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 rounded-lg"
        />

        <h1 className="mt-4">Upload Slide</h1>

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
