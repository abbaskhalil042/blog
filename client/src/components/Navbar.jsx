import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-3 bg-green-950 text-white">
      <div>
        <h1>Blog</h1>
      </div>
      <div>
        <ul className="flex gap-3">
          <li>
            <Link className="flex" to="/create">
            create
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
          </li>
          <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQHstFutlfl8tgZAtY8nDWucSWEvFM5AETQ&s" className="w-8 rounded-full" alt="" /></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
