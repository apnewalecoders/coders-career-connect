
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { X, Clock, FileText, AlertCircle, CheckCircle } from "lucide-react";
import CodeCompiler from "@/components/compiler/CodeCompiler";

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    statement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Constraints:
• 2 ≤ nums.length ≤ 10⁴
• -10⁹ ≤ nums[i] ≤ 10⁹
• -10⁹ ≤ target ≤ 10⁹
• Only one valid answer exists.`,
    difficulty: "Easy",
    testCases: [
      { input: "4\n2 7 11 15\n9", expectedOutput: "[0, 1]" },
      { input: "3\n3 2 4\n6", expectedOutput: "[1, 2]" },
      { input: "2\n3 3\n6", expectedOutput: "[0, 1]" }
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    statement: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Constraints:
• 1 ≤ s.length ≤ 10⁴
• s consists of parentheses only '()[]{}'.`,
    difficulty: "Easy",
    testCases: [
      { input: "()", expectedOutput: "true" },
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" },
      { input: "([)]", expectedOutput: "false" }
    ]
  }
];

const MockAssessmentTestInterface = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [submissions, setSubmissions] = useState<{[key: number]: boolean}>({});
  const [testStarted, setTestStarted] = useState(false);

  // Timer effect - only start when test is started
  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (testStarted && timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, testStarted]);

  // Full screen effect
  useEffect(() => {
    const enterFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(console.error);
      }
    };

    if (!showInstructions) {
      enterFullScreen();
    }

    return () => {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [showInstructions]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setShowInstructions(false);
    setTestStarted(true);
  };

  const handleCancel = () => {
    navigate('/mock-assessment');
  };

  const handleExit = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    navigate('/mock-assessment');
  };

  const handleTimeUp = () => {
    navigate(`/mock-assessment/${assessmentId}/results`, {
      state: { timeExpired: true, submissions }
    });
  };

  const handleQuestionTab = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmissionSuccess = () => {
    setSubmissions(prev => ({ ...prev, [currentQuestion]: true }));
    
    if (currentQuestion < mockProblems.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate(`/mock-assessment/${assessmentId}/results`, {
        state: { submissions: { ...submissions, [currentQuestion]: true }, timeExpired: false }
      });
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="max-w-2xl w-full mx-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-6 w-6 text-brand-red" />
              Assessment Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Test Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Test Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>Total Questions: 2 coding problems</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Time Limit: 60 minutes</span>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Important Guidelines
              </h3>
              <div className="space-y-2">
                {[
                  "You will see one question at a time with an integrated code editor",
                  "Test your code using the 'Run' button with custom inputs",
                  "Submit your solution when ready - it will be validated against test cases",
                  "Timer starts immediately after clicking 'Start Test'",
                  "All test cases must pass to mark a problem as solved",
                  "Test will auto-submit when time expires"
                ].map((guideline, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{guideline}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleStartTest}
                className="flex-1 bg-brand-red hover:bg-red-600 text-white h-12 text-lg"
              >
                ✅ Start Test
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="flex-1 h-12 text-lg"
              >
                ❌ Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentProblem = mockProblems[currentQuestion];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b px-6 py-4 flex flex-col items-center">
        {/* Question Tabs */}
        <div className="flex gap-2 mb-3">
          {mockProblems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionTab(index)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                index === currentQuestion
                  ? 'bg-brand-red text-white shadow-md'
                  : submissions[index]
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
              {submissions[index] && ' ✓'}
            </button>
          ))}
        </div>
        
        {/* Timer */}
        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
          <Clock className="h-5 w-5 text-red-500" />
          <span className="font-mono text-xl font-bold text-red-600">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Exit Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-red-600 hover:text-red-700 hover:bg-red-50">
              <X className="h-4 w-4 mr-1" />
              Exit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Exit Assessment?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to exit? Your progress will be saved but you won't be able to continue this session.
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

      {/* Main Content - Code Compiler */}
      <div className="flex-1">
        <CodeCompiler
          problemTitle={currentProblem.title}
          problemStatement={currentProblem.statement}
          difficulty={currentProblem.difficulty}
          testCases={currentProblem.testCases}
          onSubmissionSuccess={handleSubmissionSuccess}
          isFullScreen={true}
          showTimer={true}
          timeLeft={timeLeft}
        />
      </div>
    </div>
  );
};

export default MockAssessmentTestInterface;
