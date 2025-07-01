import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import Jobs from "./pages/Jobs";
import StudyMaterial from "./pages/StudyMaterial";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PostJob from "./pages/PostJob";
import NotFound from "./pages/NotFound";

// New Explore Pages
import MockTest from "./pages/MockTest";
import MockTestDetail from "./pages/MockTestDetail";
import MockTestInstructions from "./pages/MockTestInstructions";
import MockTestInterface from "./pages/MockTestInterface";
import MockTestResults from "./pages/MockTestResults";
import MockAssessment from "./pages/MockAssessment";
import MockAssessmentDetail from "./pages/MockAssessmentDetail";
import MockAssessmentInterface from "./pages/MockAssessmentInterface";
import MockAssessmentResults from "./pages/MockAssessmentResults";
import MockAssessmentTestInterface from "./pages/MockAssessmentTestInterface";
import PracticeProblems from "./pages/PracticeProblems";
import PracticeProblemSolving from "./pages/PracticeProblemSolving";
import InterviewPreparation from "./pages/InterviewPreparation";
import InterviewExperienceDetail from "./pages/InterviewExperienceDetail";

// Admin Pages
import AdminPanel from "./pages/AdminPanel";
import CreateMockTest from "./pages/admin/CreateMockTest";
import CreateMockAssessment from "./pages/admin/CreateMockAssessment";
import CreateCodingProblem from "./pages/admin/CreateCodingProblem";
import CreateInterviewExperience from "./pages/admin/CreateInterviewExperience";

// Context
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/study-material" element={<StudyMaterial />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/post-job" element={<PostJob />} />
              
              {/* Mock Test Routes */}
              <Route path="/mock-test" element={<MockTest />} />
              <Route path="/mock-test/:testId" element={<MockTestDetail />} />
              <Route path="/mock-test/:testId/instructions" element={<MockTestInstructions />} />
              <Route path="/mock-test/:testId/test" element={<MockTestInterface />} />
              <Route path="/mock-test/:testId/results" element={<MockTestResults />} />
              
              {/* Mock Assessment Routes */}
              <Route path="/mock-assessment" element={<MockAssessment />} />
              <Route path="/mock-assessment/:assessmentId" element={<MockAssessmentDetail />} />
              <Route path="/mock-assessment/:assessmentId/interface" element={<MockAssessmentTestInterface />} />
              <Route path="/mock-assessment/:assessmentId/results" element={<MockAssessmentResults />} />
              
              {/* Other Explore Routes */}
              <Route path="/practice-problems" element={<PracticeProblems />} />
              <Route path="/practice-problems/:problemId" element={<PracticeProblemSolving />} />
              <Route path="/interview-preparation" element={<InterviewPreparation />} />
              <Route path="/interview-preparation/:experienceId" element={<InterviewExperienceDetail />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/create-mock-test" element={<CreateMockTest />} />
              <Route path="/admin/create-mock-assessment" element={<CreateMockAssessment />} />
              <Route path="/admin/create-coding-problem" element={<CreateCodingProblem />} />
              <Route path="/admin/create-interview-experience" element={<CreateInterviewExperience />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
