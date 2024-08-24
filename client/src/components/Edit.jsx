import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
        const { post } = response.data; // Extract the post object
        const { title, description, file } = post; // Adjust based on actual response keys

        setTitle(title);
        setDescription(description);
        setCurrentImage(file); // Update based on the correct key
        console.log("Fetched blog data from edit:", { title, description, file });
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Failed to load blog data.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/blog/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/home`);
    } catch (error) {
      console.error("Error updating blog post:", error);
      setError("Failed to update the blog post.");
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
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
        />
        <div>
          {currentImage && (
            <div>
              <img
                src={currentImage}
                alt="Current"
                className="mb-2"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
              <p>Current Image</p>
            </div>
          )}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-cyan-700 text-white py-2 px-6 rounded-lg mt-4"
          disabled={loading}
        >
          {loading ? "Updating..." : "Edit"}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Edit;
