import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Read = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
        const { post } = response.data; // Extract the post object
        setBlog(post); // Set the entire post object
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to fetch blog post.");
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
        {blog.file && (
          <img
            src={blog.file}
            alt={blog.title}
            className="w-full h-auto mb-4 rounded"
            onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
          />
        )}
        <p>{blog.description}</p>
      </div>
    </div>
  );
};

export default Read;
