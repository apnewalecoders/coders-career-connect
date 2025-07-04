
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import MonacoCodeEditor from "@/components/editor/MonacoCodeEditor";
import AssessmentHeader from "./components/AssessmentHeader";
import QuestionNavigation from "./components/QuestionNavigation";
import ProblemDisplay from "./components/ProblemDisplay";

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

  const currentProblem = mockProblems[currentQuestion];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Top Navigation Bar */}
      <AssessmentHeader 
        assessmentId={assessmentId}
        timeLeft={timeLeft}
        onExit={handleExit}
      />

      {/* Question Navigation */}
      <QuestionNavigation 
        currentQuestion={currentQuestion}
        questionStatus={questionStatus}
        totalQuestions={mockProblems.length}
        onQuestionSwitch={handleQuestionSwitch}
      />

      {/* Main Content - Resizable Split Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Problem Statement */}
          <ResizablePanel defaultSize={45} minSize={30} maxSize={60}>
            <ProblemDisplay problem={currentProblem} />
          </ResizablePanel>
          
          <ResizableHandle withHandle className="w-1 bg-gray-200 hover:bg-gray-300 transition-colors" />
          
          {/* Right Panel - Code Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <div className="h-full bg-white">
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
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default FullScreenAssessment;
