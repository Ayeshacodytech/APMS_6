import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signin } from "./pages/signin.jsx";
import { Signup } from "./pages/signup.jsx";
import React from "react";
import Home from "./pages/home.jsx";
import JobDetails from "./pages/jobdetails.jsx";
import ProfilePage from "./pages/profile.jsx";
import { AuthProvider } from "./auth/authContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/home/:id" element={<JobDetails />} />
            <Route path="/profile" element={<ProfilePage></ProfilePage>} />

            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
