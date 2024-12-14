import { useNavigate } from "react-router-dom";

function CreateClass() {
  const navigate = useNavigate();
  const createClass = () => {
    navigate("create/class");
  };
  return (
    <div>
      <button
        onClick={createClass}
        className="bg-blue-700 rounded-lg w-32 text-white h-6  hover:bg-blue-600 "
      >
        + Create Class
      </button>
    </div>
  );
}

export default CreateClass;
