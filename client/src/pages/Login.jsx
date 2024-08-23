import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit =async (e) => {
    e.preventDefault();
   
    



  };

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
          className=" py-2 px-6 border border-cyan-700  rounded-lg focus:outline-none "
        />
        <br />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className=" py-2 px-6 border border-cyan-700  rounded-lg focus:outline-none "
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
          signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
