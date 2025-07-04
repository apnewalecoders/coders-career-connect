
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { X, Clock } from "lucide-react";
import MonacoCodeEditor from "@/components/editor/MonacoCodeEditor";

interface FullScreenAssessmentProps {
  assessmentId: number;
  onExit: () => void;
}

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

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
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.

Constraints:
• 0 ≤ s.length ≤ 5 * 10⁴
• s consists of English letters, digits, symbols and spaces.`,
    difficulty: "Medium",
    testCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" },
      { input: "pwwkew", expectedOutput: "3" },
      { input: "", expectedOutput: "0" }
    ]
  }
];

const FullScreenAssessment = ({ assessmentId, onExit }: FullScreenAssessmentProps) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionStatus, setQuestionStatus] = useState<{[key: number]: 'unattempted' | 'attempted' | 'submitted'}>({
    0: 'unattempted',
    1: 'unattempted'
  });

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
          handleTimeExpiry();
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

  const handleTimeExpiry = () => {
    navigate(`/mock-assessment/${assessmentId}/results`);
  };

  const handleExit = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    onExit();
  };

  const handleQuestionSwitch = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const handleSubmissionSuccess = () => {
    setQuestionStatus(prev => ({ ...prev, [currentQuestion]: 'submitted' }));
    
    // Check if all questions are submitted
    const allSubmitted = Object.values({ ...questionStatus, [currentQuestion]: 'submitted' })
      .every(status => status === 'submitted');
    
    if (allSubmitted) {
      navigate(`/mock-assessment/${assessmentId}/results`);
    }
  };

  const handleRunCode = () => {
    setQuestionStatus(prev => ({ 
      ...prev, 
      [currentQuestion]: prev[currentQuestion] === 'unattempted' ? 'attempted' : prev[currentQuestion] 
    }));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-600 text-white';
      case 'attempted': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return '✓';
      case 'attempted': return '◐';
      default: return '○';
    }
  };

  const currentProblem = mockProblems[currentQuestion];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Left: Assessment Info */}
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">Mock Assessment #{assessmentId}</h1>
          </div>

          {/* Center: Timer */}
          <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
            <Clock className="h-5 w-5 text-red-600" />
            <span className="font-mono text-xl font-bold text-red-600">
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Right: Exit Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                <X className="h-4 w-4 mr-2" />
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

        {/* Question Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {mockProblems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionSwitch(index)}
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                index === currentQuestion
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className={`text-sm ${getStatusColor(questionStatus[index])} rounded-full w-5 h-5 flex items-center justify-center text-xs`}>
                {getStatusIcon(questionStatus[index])}
              </span>
              Question {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Resizable Split Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Problem Statement */}
          <ResizablePanel defaultSize={45} minSize={30} maxSize={60}>
            <div className="h-full bg-white overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Problem Title */}
                <div className="border-b pb-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">{currentProblem.title}</h1>
                    <Badge className={`${
                      currentProblem.difficulty.toLowerCase() === 'easy' ? 'bg-green-100 text-green-800' :
                      currentProblem.difficulty.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentProblem.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <div className="prose max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {currentProblem.description}
                    </div>
                  </div>
                </div>

                {/* Sample Test Cases */}
                {currentProblem.testCases && currentProblem.testCases.length > 0 && (
                  <div className="space-y-4">
                    {currentProblem.testCases.slice(0, 2).map((testCase, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-semibold text-gray-900">Example {index + 1}:</h3>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-gray-700">Input:</span>
                              <pre className="mt-1 text-sm text-gray-800 font-mono bg-white p-2 rounded border overflow-x-auto">
                                {testCase.input}
                              </pre>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Output:</span>
                              <pre className="mt-1 text-sm text-gray-800 font-mono bg-white p-2 rounded border overflow-x-auto">
                                {testCase.expectedOutput}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Panel - Code Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <MonacoCodeEditor
              problemTitle={currentProblem.title}
              problemStatement={currentProblem.description}
              difficulty={currentProblem.difficulty}
              testCases={currentProblem.testCases}
              onSubmissionSuccess={handleSubmissionSuccess}
              isFullScreen={true}
              showTimer={false}
              layout="compact"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default FullScreenAssessment;
