
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
import MockAssessment from "./pages/MockAssessment";
import PracticeProblems from "./pages/PracticeProblems";
import InterviewPreparation from "./pages/InterviewPreparation";

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
              
              {/* New Explore Routes */}
              <Route path="/mock-test" element={<MockTest />} />
              <Route path="/mock-assessment" element={<MockAssessment />} />
              <Route path="/practice-problems" element={<PracticeProblems />} />
              <Route path="/interview-preparation" element={<InterviewPreparation />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
