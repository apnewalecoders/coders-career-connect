
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/sonner";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PracticeProblems from "./pages/PracticeProblems";
import PracticeProblemSolving from "./pages/PracticeProblemSolving";
import MockTest from "./pages/MockTest";
import MockTestDetail from "./pages/MockTestDetail";
import MockTestInstructions from "./pages/MockTestInstructions";
import MockTestInterface from "./pages/MockTestInterface";
import MockTestResults from "./pages/MockTestResults";
import MockAssessment from "./pages/MockAssessment";
import MockAssessmentDetail from "./pages/MockAssessmentDetail";
import MockAssessmentInterface from "./pages/MockAssessmentInterface";
import MockAssessmentTestInterface from "./pages/MockAssessmentTestInterface";
import MockAssessmentResults from "./pages/MockAssessmentResults";
import FullScreenMockAssessment from "./pages/FullScreenMockAssessment";
import InterviewPreparation from "./pages/InterviewPreparation";
import InterviewExperienceDetail from "./pages/InterviewExperienceDetail";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Blogs from "./pages/Blogs";
import StudyMaterial from "./pages/StudyMaterial";
import AdminPanel from "./pages/AdminPanel";
import ManageContent from "./pages/admin/ManageContent";
import CreateCodingProblem from "./pages/admin/CreateCodingProblem";
import CreateMockTest from "./pages/admin/CreateMockTest";
import CreateMockAssessment from "./pages/admin/CreateMockAssessment";
import CreateInterviewExperience from "./pages/admin/CreateInterviewExperience";
import CreateBlog from "./pages/admin/CreateBlog";
import AddStudyMaterial from "./pages/admin/AddStudyMaterial";
import AdminPostJob from "./pages/admin/AdminPostJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Practice Problems */}
              <Route path="/practice" element={<PracticeProblems />} />
              <Route path="/practice/:id" element={<PracticeProblemSolving />} />
              
              {/* Mock Tests */}
              <Route path="/mock-test" element={<MockTest />} />
              <Route path="/mock-test/:id" element={<MockTestDetail />} />
              <Route path="/mock-test/:id/instructions" element={<MockTestInstructions />} />
              <Route path="/mock-test/:id/interface" element={<MockTestInterface />} />
              <Route path="/mock-test/:id/results" element={<MockTestResults />} />
              
              {/* Mock Assessments */}
              <Route path="/mock-assessment" element={<MockAssessment />} />
              <Route path="/mock-assessment/:id" element={<MockAssessmentDetail />} />
              <Route path="/mock-assessment/:id/interface" element={<MockAssessmentInterface />} />
              <Route path="/mock-assessment/:id/fullscreen" element={<FullScreenMockAssessment />} />
              <Route path="/mock-assessment/:id/test" element={<MockAssessmentTestInterface />} />
              <Route path="/mock-assessment/:id/results" element={<MockAssessmentResults />} />
              
              {/* Interview Preparation */}
              <Route path="/interview-preparation" element={<InterviewPreparation />} />
              <Route path="/interview-experience/:id" element={<InterviewExperienceDetail />} />
              
              {/* Jobs */}
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/post-job" element={<PostJob />} />
              
              {/* Services & Info */}
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/study-material" element={<StudyMaterial />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/manage-content" element={<ManageContent />} />
              <Route path="/admin/create-coding-problem" element={<CreateCodingProblem />} />
              <Route path="/admin/create-mock-test" element={<CreateMockTest />} />
              <Route path="/admin/create-mock-assessment" element={<CreateMockAssessment />} />
              <Route path="/admin/create-interview-experience" element={<CreateInterviewExperience />} />
              <Route path="/admin/create-blog" element={<CreateBlog />} />
              <Route path="/admin/add-study-material" element={<AddStudyMaterial />} />
              <Route path="/admin/post-job" element={<AdminPostJob />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
