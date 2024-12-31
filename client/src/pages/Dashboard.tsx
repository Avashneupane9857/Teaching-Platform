import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";
import { Upload } from "lucide-react";
import SlideUploader from "../components/SlideUploader";

interface ClassType {
  id: string;
  title: string;
  teacherId: string;
}

export const CreateClassButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/create/class")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
    >
      <span className="text-lg">+</span>
      Create Class
    </button>
  );
};

export const ClassCard = ({
  data,
  onJoin,
  children,
}: {
  data: ClassType;
  onJoin: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{data.title}</h3>
        <span className="text-sm text-gray-500">ID: {data.teacherId}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Upload size={16} />
            <span className="text-sm">Slides</span>
          </div>
          {children}
        </div>

        <button
          onClick={onJoin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Join Class
        </button>
      </div>
    </div>
  );
};

export const Classes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [classes, setClasses] = useState<ClassType[]>([]);

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
        alert("Cannot fetch classes!");
      }
    };
    fetchClasses();
  }, [token]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Your Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classData) => (
          <ClassCard
            key={classData.id}
            data={classData}
            onJoin={() => navigate(`/class/${classData.id}/${classData.title}`)}
          >
            <SlideUploader classId={classData.id} />
          </ClassCard>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <CreateClassButton />
          </div>
          <Classes />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
