import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("API Response:", response.data);

      const { token, profileImage } = response.data;
      const userData = { token, profileImage };
      localStorage.setItem("userData", JSON.stringify(userData));

      // Set an item in localStorage to trigger redirection after reload
      localStorage.setItem("redirectToHome", "true");

      // Reload the page to update the Navbar
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  };

  // Check for redirection after reload
  React.useEffect(() => {
    const shouldRedirect = localStorage.getItem("redirectToHome");

    if (shouldRedirect) {
      // Remove the item from localStorage to prevent repeated redirects
      localStorage.removeItem("redirectToHome");

      // Redirect to home
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center flex-col items-center w-full h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="p-10 flex flex-col rounded-xl bg-white "
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
        />
        <button
          type="submit"
          className="bg-cyan-700 text-white py-2 px-6 rounded-lg mt-4"
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="text-cyan-700" to={"/signup"}>
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
