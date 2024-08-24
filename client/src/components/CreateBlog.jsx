import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("file", file); // Ensure the key matches the server-side field name
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/blog/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response data:", response.data);
      setTitle("");
      setDescription("");
      setFile(null);
      fileInputRef.current.value = ""; // Clear the file input
      navigate("/home");
    } catch (error) {
      console.error("An error occurred:", error);
      setError(error.response?.data?.msg || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
          required
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            console.log("File selected:", e.target.files[0]);
            setFile(e.target.files[0]);
          }}
          className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
        />
        <button
          type="submit"
          className="bg-cyan-700 text-white py-2 px-6 rounded-lg mt-4"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create"}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default CreateBlog;
