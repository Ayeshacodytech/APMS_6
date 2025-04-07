import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { AuthProvider } from "./auth/authContext";
import store, { persistor } from "./store/store.js"; // Import store and persistor from redux-persist setup

// Import other components and pages
import "./App.css";
import AptitudeMCQ from "./components/AptitudeMCQ.jsx";
import AptitudeMCQs from "./components/aptitudeMCQs.jsx";
import Article from "./components/article.jsx";
import TeacherAptitudeMCQs from "./components/teacheraptitudeMCQs.jsx";
import TeacherAptitudemyMCQs from "./components/teacheraptitudemyMCQs.jsx";
import TeacherArticle from "./components/teacherarticle.jsx";
import AddAptitudeMCQ from "./pages/addAptitudemcq.jsx";
import AddJob from "./pages/addjob.jsx";
import AdminHome from "./pages/adminHome.jsx";
import Adminjobdetails from "./pages/adminjobdetails.jsx";
import { Adminsignin } from "./pages/adminsignin.jsx";
import Aptitudehome from "./pages/aptitudeHome.jsx";
import AptitudeProfile from "./pages/aptitudeProfile.jsx";
import Communityhome from "./pages/CommunityHome.jsx";
import CommunityProfile from "./pages/communityProfile.jsx";
import Home from "./pages/home.jsx";
import JobDetails from "./pages/jobdetails.jsx";
import { Jobs } from "./pages/jobs.jsx";
import NewPostForm from "./pages/newPost.jsx";
import NewResourceForm from "./pages/newResource.jsx";
import ProfilePage from "./pages/profile.jsx";
import { Signin } from "./pages/signin.jsx";
import { Signup } from "./pages/signup.jsx";
import TeacherAptitudehome from "./pages/teacheraptitudeHome.jsx";
import TeacherAptitudeProfile from "./pages/teacheraptitudeProfile.jsx";
import TeacherCommunityhome from "./pages/TeacherCommunityHome.jsx";
import TeacherCommunityProfile from "./pages/teachercommunityProfile.jsx";
import TeacherHome from "./pages/teacherhome.jsx";
import TeacherNewPostForm from "./pages/teachernewPost.jsx";
import TeacherNewResourceForm from "./pages/teachernewResource.jsx";
import TeacherSignin from "./pages/teachersignin.jsx";
import TeacherSignup from "./pages/teachersignup.jsx";
import { Updatejob } from "./pages/updatejob.jsx";
import WebSocketListener from "./components/WebSocketListener.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UnderDevelopment from "./components/Underdevlopment.jsx";
import Gatehome from "./pages/gateHome.jsx";
import GateMCQs from "./components/gateMCQs.jsx";
import GateMCQ from "./components/GateMCQ.jsx";
import NewGateResourceForm from "./pages/newGateResource.jsx";
import GateProfile from "./pages/gateProfile.jsx";
import AddGateMCQ from "./pages/addGatemcq.jsx";
import TeacherGatehome from "./pages/teachergateHome.jsx";
import TeacherGateMCQs from "./components/teachergateMCQs.jsx";
import TeacherGatemyMCQs from "./components/teachergatemyMCQs.jsx";
import TeacherGateProfile from "./pages/teacherGateProfile.jsx";
import ProblemListPage from "./pages/problemListPage.jsx";
import ProblemDetailPage from "./pages/problemDetailPage.jsx";
import Leaderboard from "./pages/leaderBoard.jsx";
import SubmissionsPage from "./pages/submissionHistory.jsx";
import SubmissionDetailPage from "./pages/submissionDetail.jsx";
import ProblemForm from "./pages/problemform.jsx";
import AdminProblemListPage from "./pages/adminproblemListPage.jsx";
import AdminLeaderboard from "./pages/adminleaderBoard.jsx";
import AdminProblemDetailPage from "./pages/adminproblemDetailPage.jsx";
 // Import socket helpers

function App() {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <BrowserRouter>
          <WebSocketListener />

            {/* Global Toast Container */}
            <ToastContainer />
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/teacher/home" element={<TeacherHome />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/admin/jobs/:id" element={<Adminjobdetails />} />
              <Route path="/admin/update/job/:id" element={<Updatejob />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/new" element={<NewPostForm />} />
              <Route path="/community" element={<Communityhome />} />
              <Route path="/community/:id" element={<Article />} />
              <Route path="/communityprofile" element={<CommunityProfile />} />
              <Route path="/admin/signin" element={<Adminsignin />} />
              <Route path="/admin/code/add" element={<ProblemForm />} />
              <Route path="/admin/code/problem" element={<AdminProblemListPage />} />
              <Route path="/admin/leaderboard" element={<AdminLeaderboard />} />
              <Route path="/teacher/signup" element={<TeacherSignup />} />
              <Route path="/teacher/signin" element={<TeacherSignin />} />
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/addjob" element={<AddJob />} />
              <Route path="/admin/code/problems" element={<AdminProblemListPage />} />
              <Route path="/admin/code/problem/:id" element={<AdminProblemDetailPage />} />
              <Route path="/teacher/new" element={<TeacherNewPostForm />} />
              <Route path="/teacher/community" element={<TeacherCommunityhome />} />
              <Route path="/teacher/community/:id" element={<TeacherArticle />} />
              <Route path="/teacher/communityprofile" element={<TeacherCommunityProfile />} />
              <Route path="/aptitude/mcq" element={<AptitudeMCQs />} />
              <Route path="/aptitude/mcq/:id" element={<AptitudeMCQ />} />
              <Route path="/aptitude" element={<Aptitudehome />} />
              <Route path="/code" element={<UnderDevelopment />} />
              <Route path="/gate" element={<Gatehome />} />
              <Route path="/gate/mcq" element={<GateMCQs />} />
              <Route path="/gate/mcq/:id" element={<GateMCQ />} />
              <Route path="/gate/new/resource" element={<NewGateResourceForm />} />
              <Route path="/gate/myresources" element={<GateProfile />} />
              <Route path="/aptitude/new/resource" element={<NewResourceForm />} />
              <Route path="/teacher/aptitude/new/mcq" element={<AddAptitudeMCQ />} />
              <Route path="/teacher/aptitude/home" element={<TeacherAptitudehome />} />
              <Route path="/teacher/aptitude/mcq" element={<TeacherAptitudeMCQs />} />
              <Route path="/teacher/aptitude/mymcq" element={<TeacherAptitudemyMCQs />} />
              <Route path="/teacher/aptitude/myresource" element={<TeacherAptitudeProfile />} />
              <Route path="/teacher/aptitude/new/resource" element={<TeacherNewResourceForm />} />
              <Route path="/teacher/gate/new/mcq" element={<AddGateMCQ />} />
              <Route path="/teacher/aptitude/home" element={<TeacherGatehome />} />
              <Route path="/teacher/aptitude/mcq" element={<TeacherGateMCQs />} />
              <Route path="/teacher/aptitude/mymcq" element={<TeacherGatemyMCQs />} />
              <Route path="/teacher/aptitude/myresource" element={<TeacherGatehome />} />
              <Route path="/teacher/aptitude/new/resource" element={<TeacherGateProfile />} />
              <Route path="/aptitude/myresources" element={<AptitudeProfile />} />
              <Route path="/code/home" element={<ProblemListPage />} />
              <Route path="/code/problem/:id" element={<ProblemDetailPage />} />
              <Route path="/code/leaderboard" element={<Leaderboard />} />
              <Route path="/code/submission" element={<SubmissionsPage/>}/>
              <Route path="/code/submission/:id" element={<SubmissionDetailPage/>}/>

              {/* <Route path="*" element={<Navigate to="/signin" replace />} /> */}
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
