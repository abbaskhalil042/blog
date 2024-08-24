import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blog, setBlog] = useState([]);

  async function getBlog() {
    const response = await axios.get("http://localhost:5000/api/blog/get");

    // const result = await response.json();
    //
    console.log(response.data?.posts);

    setBlog(response.data?.posts);
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="p-4">
      <div>
        <Link className="py-2 px-6 mb-3 text-white rounded-lg bg-cyan-950" to={"/create"}>Create</Link>
      </div>
      <table className="min-w-full border-collapse  mt-4 border text-center border-gray-300">
        <thead className="text-center">
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Description
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Image
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {blog.map((data, i) => {
            return (
              <>
                <tr key={i} className="border-b border-gray-300">
                  <td className="border-r border-gray-300 px-4 py-2">
                    {data.title}
                  </td>
                  <td className="border-r border-gray-300 px-4 py-2">
                    {data.description}
                  </td>
                  <td className="border-r border-gray-300 px-4 py-2">
                    <img className="w-[10rem]" src={data?.image} alt="" />
                  </td>
                  <td className="px-4 py-2 flex justify-center items-center">
                    <Link
                      to={"/update/" + data._id}
                      className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                    <Link to={"/delete/" + data._id} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Blog;
