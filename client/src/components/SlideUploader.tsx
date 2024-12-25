import { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import { backendUrl } from "../config";

const SlideUploader = (classId) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${backendUrl}/slides/${classId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError("Failed to upload slide. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-10 p-2">
      <label className="flex flex-col items-center p-2 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
        <Upload className="w-6 h-6 text-gray-500" />
        <span className="mt-1 text-xs text-gray-500">
          {uploading ? "..." : "Upload"}
        </span>
        <input
          type="file"
          className="hidden"
          accept=".pdf,.ppt,.pptx"
          onChange={handleFileUpload}
          disabled={uploading}
        />
      </label>
      {error && (
        <div className="mt-2 p-2 text-xs bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-2 p-2 text-xs bg-green-100 border border-green-400 text-green-700 rounded">
          Success!
        </div>
      )}
    </div>
  );
};

export default SlideUploader;
