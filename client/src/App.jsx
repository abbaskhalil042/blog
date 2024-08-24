import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateBlog from "./components/CreateBlog";
import Edit from "./components/Edit";
import NotFound from "./components/NotFound";
// import { UserProvider, useUser } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Delete from "./components/Delete";
import Read from "./components/Read";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/create"
            element={<PrivateRoute element={<CreateBlog />} />}
          />
          <Route
            path="/edit/:id"
            element={<PrivateRoute element={<Edit />} />}
          />
          <Route
            path="/delete/:id"
            element={<PrivateRoute element={<Delete />} />}
          />
          <Route
            path="/read/:id"
            element={<PrivateRoute element={<Read />} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
// PrivateRoute Component
const PrivateRoute = ({ element }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;

  return token ? element : <Navigate to="/" />;
};
