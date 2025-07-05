import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import MockAssessmentHeader from "@/components/assessment/components/MockAssessmentHeader";
import MockQuestionNavigation from "@/components/assessment/components/MockQuestionNavigation";
import MockProblemDisplay from "@/components/assessment/components/MockProblemDisplay";
import MockCodeEditorPanel from "@/components/assessment/components/MockCodeEditorPanel";

const codingProblems = [
  {
    id: 1,
    title: "Two Sum Problem",
    statement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: `Constraints:
• 2 ≤ nums.length ≤ 10⁴
• -10⁹ ≤ nums[i] ≤ 10⁹
• -10⁹ ≤ target ≤ 10⁹
• Only one valid answer exists.`,
    sampleInput: `Input: nums = [2,7,11,15], target = 9`,
    sampleOutput: `Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Valid Parentheses",
    statement: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: `Constraints:
• 1 ≤ s.length ≤ 10⁴
• s consists of parentheses only '()[]{}'.`,
    sampleInput: `Input: s = "()[]{}"`,
    sampleOutput: `Output: true
Explanation: All brackets are properly matched and nested.`,
    difficulty: "Easy"
  }
];

const MockAssessmentInterface = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [codes, setCodes] = useState<{[key: number]: string}>({
    0: "# Write your solution here\n",
    1: "# Write your solution here\n"
  });
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [isRunning, setIsRunning] = useState(false);
  const [submissions, setSubmissions] = useState<{[key: number]: boolean}>({0: false, 1: false});
  const [darkMode, setDarkMode] = useState(true);

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

  const handleRun = async () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      let resultOutput = "";
      
      if (customInput.trim()) {
        resultOutput = `Output for input: ${customInput}\n[1, 0]`;
      } else {
        if (currentQuestionIndex === 0) {
          resultOutput = "Sample Output:\n[0, 1]\n\n✅ Test Case 1: Passed\n✅ Test Case 2: Passed\n✅ Test Case 3: Passed";
        } else {
          resultOutput = "Sample Output:\ntrue\n\n✅ Test Case 1: Passed\n✅ Test Case 2: Passed\n❌ Test Case 3: Failed (Expected: false, Got: true)";
        }
      }
      
      setOutput(resultOutput);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    // Mark current question as submitted
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

  const handleCodeChange = (value: string) => {
    setCodes(prev => ({ ...prev, [currentQuestionIndex]: value }));
  };

  const handleReset = () => {
    setCodes(prev => ({ ...prev, [currentQuestionIndex]: "# Write your solution here\n" }));
  };

  const currentProblem = codingProblems[currentQuestionIndex];
  const isCurrentSubmitted = submissions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Fixed Header */}
      <MockAssessmentHeader 
        assessmentId={assessmentId}
        timeLeft={timeLeft}
        onExit={handleExit}
      />

      {/* Question Navigation Tabs */}
      <Tabs value={currentQuestionIndex.toString()} onValueChange={(value) => setCurrentQuestionIndex(parseInt(value))} className="flex-shrink-0">
        <MockQuestionNavigation 
          totalQuestions={codingProblems.length}
          submissions={submissions}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Panel - Problem Description */}
            <ResizablePanel defaultSize={45} minSize={30} maxSize={60}>
              <div className="h-full p-6 bg-white">
                <MockProblemDisplay 
                  problem={currentProblem}
                  currentQuestionIndex={currentQuestionIndex}
                  isSubmitted={isCurrentSubmitted}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="w-1 bg-gray-200 hover:bg-gray-300" />

            {/* Right Panel - Code Editor */}
            <ResizablePanel defaultSize={55} minSize={40}>
              <MockCodeEditorPanel
                language={language}
                darkMode={darkMode}
                code={codes[currentQuestionIndex]}
                customInput={customInput}
                output={output}
                isRunning={isRunning}
                isCurrentSubmitted={isCurrentSubmitted}
                onLanguageChange={setLanguage}
                onDarkModeToggle={() => setDarkMode(!darkMode)}
                onCodeChange={handleCodeChange}
                onCustomInputChange={setCustomInput}
                onReset={handleReset}
                onRun={handleRun}
                onSubmit={handleSubmit}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Tabs>
    </div>
  );
};

export default MockAssessmentInterface;
