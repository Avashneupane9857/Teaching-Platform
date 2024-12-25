import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../config";
import SlideUploader from "./SlideUploader";
interface ClassType {
  id: string;
  title: string;
  teacherId: string;
}
function Classes() {
  //yo maybe not needed i have to pass class id dynamically
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [classes, setClasses] = useState<ClassType[]>([]);

  const handleClass = (id: string, title: string) => {
    //send classId here

    navigate(`/class/${id}/${title}`);
  };
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${backendUrl}/class`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClasses(response.data);
      } catch (err) {
        console.log(err);
        alert("Cant fetch  classes !");
      }
    };
    fetchClasses();
  }, [classes, token]);
  return (
    <div className="p-16 ">
      <h1 className="font-semibold text-2xl ">Classes</h1>

      {classes.map((data) => (
        <section className="w-[50%] bg-slate-200 border-[1px] h-28 p-8 relative top-5 shadow-2xl rounded-lg">
          <div key={data.id} className="flex justify-between">
            <p>{data.title}</p>
            <p>{data.teacherId}</p>
            <p>Slides</p>
            <SlideUploader classId={data.id} />
            <button
              onClick={() => handleClass(data.id, data.title)}
              className="bg-blue-700 rounded-lg w-20 hover:bg-blue-600 text-white"
            >
              Join
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}

//Place slide here use get api here

export default Classes;
