import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendUrl } from "../config";

const SlideViewer = () => {
  const { classId } = useParams();
  const slideId = 4;
  const [slideUrl, setSlideUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlide = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/slides/${classId}/${slideId}`,
          {
            responseType: "blob",
            withCredentials: true,
          }
        );

        const url = URL.createObjectURL(response.data);
        setSlideUrl(url);
      } catch (err) {
        setError("Error loading slide");
        console.error("Actual error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlide();

    return () => {
      if (slideUrl) {
        URL.revokeObjectURL(slideUrl);
      }
    };
  }, [classId, slideId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full h-full relative">
      <img src={slideUrl} alt="Slide content" className="max-w-full h-auto" />
    </div>
  );
};

export default SlideViewer;
