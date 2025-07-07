
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MockProblemStatement from "@/components/assessment/components/MockProblemStatement";
import MockCodeEditor from "@/components/assessment/components/MockCodeEditor";

const codingProblems = [
  {
    id: 1,
    title: "Two Sum Problem",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    topics: ["Array", "Hash Table"],
    testCases: [
      { input: "4\n2 7 11 15\n9", expectedOutput: "[0, 1]" },
      { input: "3\n3 2 4\n6", expectedOutput: "[1, 2]" }
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only '()[]{}'."
    ],
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    topics: ["Stack", "String"],
    testCases: [
      { input: "()", expectedOutput: "true" },
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" }
    ]
  }
];

const MockAssessmentInterface = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submissions, setSubmissions] = useState<{[key: number]: boolean}>({0: false, 1: false});

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleTimeUp();
    }
  }, [timeLeft]);

  // Full screen effect
  useEffect(() => {
    const enterFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(console.error);
      }
    };

    enterFullScreen();

    return () => {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    navigate(`/mock-assessment/${assessmentId}/results`, {
      state: { timeExpired: true, submissions }
    });
  };

  const handleExit = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    navigate(`/mock-assessment/${assessmentId}/results`, {
      state: { timeExpired: false, submissions }
    });
  };

  const handleSubmissionSuccess = () => {
    setSubmissions(prev => ({ ...prev, [currentQuestionIndex]: true }));
    
    toast({
      title: "Code Submitted!",
      description: `Question ${currentQuestionIndex + 1} has been submitted successfully.`
    });

    // Check if this was the last question
    if (currentQuestionIndex === codingProblems.length - 1) {
      // All questions completed, go to results
      navigate(`/mock-assessment/${assessmentId}/results`, {
        state: { submissions: { ...submissions, [currentQuestionIndex]: true }, timeExpired: false }
      });
    }
  };

  const currentProblem = codingProblems[currentQuestionIndex];
  const isCurrentSubmitted = submissions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Mock Assessment #{assessmentId}</h1>
            <div className="flex gap-2">
              {codingProblems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-blue-600 text-white'
                      : submissions[index]
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                  {submissions[index] && ' ✓'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
              <Clock className="h-5 w-5 text-red-600" />
              <span className="font-mono text-lg font-bold text-red-600">
                {formatTime(timeLeft)}
              </span>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <LogOut className="h-4 w-4 mr-2" />
                  Exit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Exit Assessment?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to exit? Your progress will be saved.
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Problem Statement */}
          <ResizablePanel defaultSize={45} minSize={30} maxSize={60}>
            <MockProblemStatement 
              problem={{
                ...currentProblem,
                id: currentProblem.id,
                title: currentProblem.title,
                description: currentProblem.description,
                examples: currentProblem.examples,
                constraints: currentProblem.constraints?.join('\n') || '',
                difficulty: currentProblem.difficulty,
                companies: currentProblem.companies,
                topics: currentProblem.topics,
                testCases: currentProblem.testCases
              }}
              currentQuestionIndex={currentQuestionIndex}
              isSubmitted={isCurrentSubmitted}
            />
          </ResizablePanel>

          <ResizableHandle withHandle className="w-1 bg-gray-200 hover:bg-gray-300" />

          {/* Right Panel - Code Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <MockCodeEditor
              problem={{
                ...currentProblem,
                id: currentProblem.id,
                title: currentProblem.title,
                description: currentProblem.description,
                examples: currentProblem.examples,
                constraints: currentProblem.constraints?.join('\n') || '',
                difficulty: currentProblem.difficulty,
                companies: currentProblem.companies,
                topics: currentProblem.topics,
                testCases: currentProblem.testCases
              }}
              isSolved={isCurrentSubmitted}
              onSubmissionSuccess={handleSubmissionSuccess}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default MockAssessmentInterface;
