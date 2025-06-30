
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { X, Clock, Play, Code, ChevronRight } from "lucide-react";

interface FullScreenAssessmentProps {
  assessmentId: number;
  onExit: () => void;
}

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    testCases: ["Input: nums = [2,7,11,15], target = 9", "Output: [0,1]"]
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    testCases: ["Input: s = 'abcabcbb'", "Output: 3"]
  }
];

const FullScreenAssessment = ({ assessmentId, onExit }: FullScreenAssessmentProps) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [currentProblem, setCurrentProblem] = useState(0);
  const [code, setCode] = useState("// Write your solution here\n");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    // Enter full screen mode
    const enterFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(console.error);
      }
    };

    enterFullScreen();

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(timer);
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const handleAutoSubmit = () => {
    navigate(`/mock-assessment/${assessmentId}/results`);
  };

  const handleExit = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    onExit();
  };

  const handleRunCode = () => {
    setOutput("Running code...\n✅ Test case 1 passed\n✅ Test case 2 passed\n✅ All test cases passed!");
  };

  const handleSubmitProblem = () => {
    if (currentProblem < mockProblems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setCode("// Write your solution here\n");
      setOutput("");
    } else {
      navigate(`/mock-assessment/${assessmentId}/results`);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const problem = mockProblems[currentProblem];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">Mock Assessment #{assessmentId}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Problem {currentProblem + 1} of {mockProblems.length}</span>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-brand-red font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <X className="h-4 w-4 mr-1" />
              Exit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Exit Assessment?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to exit the assessment? Your progress will be saved, but you won't be able to continue this session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleExit} className="bg-red-600 hover:bg-red-700">
                Exit Assessment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Problem Section */}
        <div className="w-1/2 border-r bg-white overflow-y-auto">
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  {problem.title}
                  <span className={`text-xs px-2 py-1 rounded ${
                    problem.difficulty === "Easy" ? "bg-green-100 text-green-800" : 
                    problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-red-100 text-red-800"
                  }`}>
                    {problem.difficulty}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Problem Description:</h4>
                  <p className="text-gray-700">{problem.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Example:</h4>
                  <div className="bg-gray-50 p-3 rounded-md space-y-1">
                    {problem.testCases.map((testCase, index) => (
                      <div key={index} className="font-mono text-sm">{testCase}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="w-1/2 flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              
              <div className="flex gap-2 ml-auto">
                <Button onClick={handleRunCode} variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Run
                </Button>
                <Button onClick={handleSubmitProblem} className="bg-brand-red hover:bg-red-600 text-white" size="sm">
                  {currentProblem < mockProblems.length - 1 ? "Next Problem" : "Submit Assessment"}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full resize-none border border-gray-300 rounded-md p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                placeholder="Write your solution here..."
              />
            </div>

            {output && (
              <div className="border-t bg-gray-50 p-4">
                <h4 className="font-medium mb-2">Output:</h4>
                <pre className="bg-black text-green-400 p-3 rounded-md text-sm font-mono whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenAssessment;
