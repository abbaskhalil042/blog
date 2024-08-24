import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [loading, setLoading] = React.useState(true);
  const [profileImage, setProfileImage] = React.useState("");

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData")) || {};

    if (data.token && data.profileImage) {
      setProfileImage(data.profileImage);
    } else {
      setProfileImage("");
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");

    window.location.href = "/";
  };

  if (loading) {
    return (
      <nav className="flex justify-between p-3 bg-green-950 text-white">
        Loading...
      </nav>
    );
  }

  return (
    <nav className="flex justify-between p-3 bg-green-950 text-white">
      <div>
        <h1>Blog</h1>
      </div>
      <div>
        <ul className="flex gap-3 items-center">
          {profileImage ? (
            <>
              <li>
                <img
                  src={profileImage}
                  className="w-8 h-8 rounded-full"
                  alt="Profile"
                />
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white py-1 px-4 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
