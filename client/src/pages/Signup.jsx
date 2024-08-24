import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [file, setFile] = React.useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here, you can handle the form submission, including the file upload
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (file) {
      formData.append("file", file);
    }

    // Example: Log formData values
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // You would typically send formData to the server
    const response = await fetch("http://localhost:5000/api/user/signup", {
      method: "POST",
      body: formData,
    });

    navigate("/login")
    

    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  };

  return (
    <div className="flex justify-center flex-col items-center w-full h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="p-10 flex flex-col rounded-xl bg-white"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
        />
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
        />
        <br />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm text-stone-500 py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none
          file:mr-5 file:rounded-lg file:py-1 file:px-3 file:border-[.7px]
          file:text-xs file:font-medium
          file:bg-stone-50 file:text-stone-700
          hover:file:cursor-pointer hover:file:bg-blue-50
          hover:file:text-blue-700"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="py-2 px-6 border border-cyan-700 rounded-lg focus:outline-none"
        />
        <button
          type="submit"
          className="bg-cyan-700 text-white py-2 px-6 rounded-lg mt-4"
        >
          Signup
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link className="text-cyan-700" to={"/login"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
