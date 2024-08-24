import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Delete = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setCurrentImage] = useState("");
  const [error, setError] = useState(null);

  const { id } = useParams(); // Get the blog post ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
        console.log("from delete",response.data.post);
        const { title, description, image } = response.data.post;
        setTitle(title);
        setDescription(description);
        setCurrentImage(image); // Set the current image URL
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Failed to load blog data.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blog/delete/${id}`);
      navigate('/home'); // Redirect to home or another page after deletion
    } catch (error) {
      console.error("Error deleting blog post:", error);
      setError("Failed to delete the blog post.");
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      {image && <img src={image} alt={title} />} {/* Display the current image if available */}
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>Delete</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => navigate(`/home`)}>Cancel</button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Delete;
