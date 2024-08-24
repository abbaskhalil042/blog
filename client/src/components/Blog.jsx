import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [error, setError] = useState(null);

  async function getBlog() {
    try {
      const response = await axios.get("http://localhost:5000/api/blog/get");
      setBlog(response.data?.posts);
      console.log("Blog posts: id", response.data?.posts);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to fetch blog posts.");
    }
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex justify-end">
        <Link
          className="py-2 px-6 text-white bg-cyan-950 rounded-lg shadow hover:bg-cyan-700 transition"
          to="/create"
        >
          Create
        </Link>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-b px-4 py-2 text-left">Title</th>
              <th className="border-b px-4 py-2 text-left">Description</th>
              <th className="border-b px-4 py-2 text-left">Image</th>
              <th className="border-b px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {blog.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  No blog posts available.
                </td>
              </tr>
            ) : (
              blog.map((data) => (
                <tr key={data._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">
                    <Link to={`/read/${data._id}`} className="text-blue-500 hover:underline">
                      {data.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{data.description}</td>
                  <td className="px-4 py-2">
                    {data.file ? (
                      <img
                        className="w-32 h-20 object-cover rounded"
                        src={data.file}
                        alt={data.title}
                        onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      to={`/edit/${data._id}`}
                      className="flex items-center py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      <span className="ml-2">Edit</span>
                    </Link>
                    <Link
                      to={`/delete/${data._id}`}
                      className="flex items-center py-2 px-4 text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      <span className="ml-2">Delete</span>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blog;
