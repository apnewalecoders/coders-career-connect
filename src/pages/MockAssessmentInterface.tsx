
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MockAssessmentTimer from "@/components/assessment/components/MockAssessmentTimer";
import MockProblemDisplay from "@/components/assessment/components/MockProblemDisplay";
import MockCodeEditor from "@/components/assessment/components/MockCodeEditor";
import MockOutputSection from "@/components/assessment/components/MockOutputSection";

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
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [codes, setCodes] = useState<{[key: number]: string}>({
    0: "// Write your solution here\n",
    1: "// Write your solution here\n"
  });
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [isRunning, setIsRunning] = useState(false);
  const [submissions, setSubmissions] = useState<{[key: number]: boolean}>({0: false, 1: false});
  const [outputExpanded, setOutputExpanded] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleTimeUp();
    }
  }, [timeLeft]);

  // Warning on page reload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleTimeUp = () => {
    navigate(`/mock-assessment/${assessmentId}/results`, {
      state: { timeExpired: true, submissions }
    });
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutputExpanded(true);
    
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
    
    // Check if this was the last question
    if (currentQuestionIndex === codingProblems.length - 1) {
      // All questions completed, go to results
      navigate(`/mock-assessment/${assessmentId}/results`, {
        state: { submissions: { ...submissions, [currentQuestionIndex]: true }, timeExpired: false }
      });
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset states for next question
      setCustomInput("");
      setOutput("");
      setOutputExpanded(false);
    }
  };

  const handleCodeChange = (value: string) => {
    setCodes(prev => ({ ...prev, [currentQuestionIndex]: value }));
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleCustomInputChange = (value: string) => {
    setCustomInput(value);
  };

  const toggleOutput = () => {
    setOutputExpanded(!outputExpanded);
  };

  const currentProblem = codingProblems[currentQuestionIndex];
  const isCurrentSubmitted = submissions[currentQuestionIndex];
  const submittedCount = Object.values(submissions).filter(Boolean).length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Fixed Timer Header */}
        <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900">
                Mock Assessment - Question {currentQuestionIndex + 1} of {codingProblems.length}
                {submittedCount > 0 && ` (${submittedCount} Submitted)`}
              </h1>
              <MockAssessmentTimer timeLeft={timeLeft} />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left Panel - Problem Statement */}
            <MockProblemDisplay 
              problem={currentProblem}
              currentQuestionIndex={currentQuestionIndex}
              isSubmitted={isCurrentSubmitted}
            />

            {/* Right Panel - Code Editor */}
            <div className="space-y-4">
              <MockCodeEditor
                code={codes[currentQuestionIndex]}
                language={language}
                customInput={customInput}
                isRunning={isRunning}
                isSubmitted={isCurrentSubmitted}
                onCodeChange={handleCodeChange}
                onLanguageChange={handleLanguageChange}
                onCustomInputChange={handleCustomInputChange}
                onRun={handleRun}
                onSubmit={handleSubmit}
              />

              {/* Output Section */}
              <MockOutputSection
                output={output}
                outputExpanded={outputExpanded}
                onToggleOutput={toggleOutput}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockAssessmentInterface;
