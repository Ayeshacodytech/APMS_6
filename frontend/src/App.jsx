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
import TeacherNewPostForm from "./pages/teachernewPost.jsx";
import TeacherCommunityhome from "./pages/TeacherCommunityHome.jsx";
import TeacherCommunityProfile from "./pages/teachercommunityProfile.jsx";
import TeacherHome from "./pages/teacherhome.jsx";
import TeacherArticle from "./components/teacherarticle.jsx";
import TeacherSignup from "./pages/teachersignup.jsx";
import TeacherSignin from "./pages/teachersignin.jsx";
import Aptitudehome from "./pages/aptitudeHome.jsx";
import NewResourceForm from "./pages/newResource.jsx";
import AptitudeMCQs from "./components/aptitudeMCQs.jsx";

import AptitudeProfile from "./pages/aptitudeProfile.jsx";
import TeacherAptitudehome from "./pages/teacheraptitudeHome.jsx";
import TeacherAptitudeMCQs from "./components/teacheraptitudeMCQs.jsx";
import TeacherAptitudemyMCQs from "./components/teacheraptitudemyMCQs.jsx";
import AptitudeMCQ from "./components/AptitudeMCq.jsx";
import TeacherAptitudeProfile from "./pages/teacheraptitudeProfile.jsx";
import TeacherNewResourceForm from "./pages/teachernewResource.jsx";
import AddAptitudeMCQ from "./pages/addAptitudemcq.jsx";
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/teacher/home" element={<TeacherHome />}></Route>
            <Route path="/jobs" element={<Jobs></Jobs>} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/admin/jobs/:id" element={<Adminjobdetails />} />
            <Route path="/admin/update/job/:id" element={<Updatejob />} />
            <Route path="/profile" element={<ProfilePage></ProfilePage>}/>
            <Route path="/new" element={<NewPostForm></NewPostForm>}/>
            <Route path="/community" element={<Communityhome></Communityhome>}/>
            <Route path="/community/:id" element={<Article></Article>}/>
            <Route path="/communityprofile" element={<CommunityProfile></CommunityProfile>}/>
            <Route path="/admin/signin" element={<Adminsignin />}></Route>
            <Route path="/teacher/signup" element={<TeacherSignup />}></Route>
            <Route path="/teacher/signin" element={<TeacherSignin />}></Route>
            <Route path="/admin/home" element={<AdminHome />}></Route>
            <Route path="/admin/addjob" element={<AddJob />}></Route>
            <Route path="/teacher/new" element={<TeacherNewPostForm></TeacherNewPostForm>}/>
            <Route path="/teacher/community" element={<TeacherCommunityhome></TeacherCommunityhome>}/>
            <Route path="/teacher/community/:id" element={<TeacherArticle></TeacherArticle>}/>
            <Route path="/teacher/communityprofile" element={<TeacherCommunityProfile></TeacherCommunityProfile>}/>
            <Route path="/aptitude/mcq" element={<AptitudeMCQs />} />
            <Route path="/aptitude/mcq/:id" element={<AptitudeMCQ/>} />
            <Route path="/aptitude" element={<Aptitudehome />} />
            <Route path="/aptitude/new/resource" element={<NewResourceForm />} />
            <Route path="/teacher/aptitude/new/mcq" element={<AddAptitudeMCQ />} />
            <Route path="/teacher/aptitude/home" element={<TeacherAptitudehome />} />
            <Route path="/teacher/aptitude/mcq" element={<TeacherAptitudeMCQs />} />
            <Route path="/teacher/aptitude/mymcq" element={<TeacherAptitudemyMCQs/>} />
            <Route path="/teacher/aptitude/myresource" element={<TeacherAptitudeProfile/>} />
            <Route path="/teacher/aptitude/new/resource" element={<TeacherNewResourceForm />} />
            <Route path="/aptitude/myresources" element={<AptitudeProfile />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
