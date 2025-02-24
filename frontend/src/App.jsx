import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth/authContext";
import Article from "./components/article.jsx";
import Communityhome from "./pages/CommunityHome.jsx";
import CommunityProfile from "./pages/communityProfile.jsx";
import Home from "./pages/home.jsx";
import JobDetails from "./pages/jobdetails.jsx";
import NewPostForm from "./pages/newPost.jsx";
import ProfilePage from "./pages/profile.jsx";
import { Signin } from "./pages/signin.jsx";
import { Signup } from "./pages/signup.jsx";
import store from "./store/store.js";
import { Jobs } from "./pages/jobs.jsx";
import { Adminsignin } from "./pages/adminsignin.jsx";
import AdminHome from "./pages/adminHome.jsx";
import AddJob from "./pages/addjob.jsx";
import Adminjobdetails from "./pages/adminjobdetails.jsx";
import { Updatejob } from "./pages/updatejob.jsx";
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/jobs" element={<Jobs></Jobs>} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/admin/jobs/:id" element={<Adminjobdetails />} />
            <Route path="/admin/update/job/:id" element={<Updatejob />} />
            <Route path="/profile" element={<ProfilePage></ProfilePage>} />
            <Route path="/new" element={<NewPostForm></NewPostForm>} />
            <Route
              path="/community"
              element={<Communityhome></Communityhome>}
            />
            <Route path="/community/:id" element={<Article></Article>} />
            <Route
              path="/communityprofile"
              element={<CommunityProfile></CommunityProfile>}
            />
            <Route path="*" element={<Navigate to="/signin" />} />
            <Route path="/admin/signin" element={<Adminsignin />}></Route>
            <Route path="/admin/home" element={<AdminHome />}></Route>
            <Route path="/admin/addjob" element={<AddJob />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
