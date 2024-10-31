import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signin } from "./pages/signin.jsx";
import { Signup } from "./pages/signup.jsx";
import React from "react";
import Home from "./pages/home.jsx";
import JobDetails from "./pages/jobdetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/jobdetails" element={<JobDetails />}></Route>

        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
