import { useNavigate } from "react-router-dom";

function Classes() {
  const navigate = useNavigate();
  const handleClass = () => {
    navigate("/class/1");
  };
  return (
    <div className="p-16 ">
      <h1 className="font-semibold text-2xl ">Classes</h1>
      <section className="w-[50%] bg-slate-200 border-[1px] h-28 p-8 relative top-5 shadow-2xl rounded-lg">
        <div className="flex justify-between">
          <p>Title</p>
          <p>Teacher Id</p>
          <p>Slides</p>
          <button
            onClick={handleClass}
            className="bg-blue-700 rounded-lg w-20 hover:bg-blue-600 text-white"
          >
            Join
          </button>
        </div>
      </section>
    </div>
  );
}

export default Classes;
