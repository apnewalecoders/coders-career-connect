
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock, Play, Send, ChevronRight, ChevronLeft } from "lucide-react";

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
  const [currentProblem, setCurrentProblem] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [code, setCode] = useState("// Write your solution here\n");
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [isRunning, setIsRunning] = useState(false);
  const [submissions, setSubmissions] = useState<{[key: number]: boolean}>({});

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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    navigate(`/mock-assessment/${assessmentId}/results`, {
      state: { timeExpired: true, submissions }
    });
  };

  const handleRun = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      if (customInput.trim()) {
        setOutput(`Output for input: ${customInput}\n[1, 0]`);
      } else {
        setOutput("Sample Output:\n[0, 1]\nTest Case 1: ✅ Passed\nTest Case 2: ✅ Passed");
      }
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    const newSubmissions = { ...submissions, [currentProblem]: true };
    setSubmissions(newSubmissions);
    
    if (currentProblem < codingProblems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setCode("// Write your solution here\n");
      setOutput("");
      setCustomInput("");
    } else {
      // All problems submitted
      navigate(`/mock-assessment/${assessmentId}/results`, {
        state: { submissions: newSubmissions, timeExpired: false }
      });
    }
  };

  const currentProb = codingProblems[currentProblem];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Fixed Timer Header */}
        <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900">
                Mock Assessment - Problem {currentProblem + 1} of {codingProblems.length}
              </h1>
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-red-500" />
                <span className="font-mono text-lg font-semibold text-red-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            {/* Left Panel - Problem Statement */}
            <div className="flex flex-col">
              <Card className="flex-1 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900">
                      {currentProb.title}
                    </CardTitle>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                      {currentProb.difficulty}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Problem Statement</h3>
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {currentProb.statement}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Constraints</h3>
                    <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                      {currentProb.constraints}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Example</h3>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-700 whitespace-pre-line mb-2">
                        {currentProb.sampleInput}
                      </div>
                      <div className="text-gray-700 whitespace-pre-line">
                        {currentProb.sampleOutput}
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentProblem(Math.max(0, currentProblem - 1))}
                      disabled={currentProblem === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentProblem(Math.min(codingProblems.length - 1, currentProblem + 1))}
                      disabled={currentProblem === codingProblems.length - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Code Editor */}
            <div className="flex flex-col">
              <Card className="flex-1 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Code Editor</CardTitle>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="language">Language:</Label>
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm"
                      >
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="javascript">JavaScript</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col space-y-4">
                  {/* Code Editor Area */}
                  <div className="flex-1">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-64 p-4 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your solution here..."
                    />
                  </div>

                  {/* Custom Input */}
                  <div>
                    <Label htmlFor="custom-input" className="text-sm font-medium mb-2 block">
                      Custom Input (Optional)
                    </Label>
                    <Input
                      id="custom-input"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter custom test input..."
                      className="font-mono text-sm"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={handleRun}
                      disabled={isRunning}
                      variant="outline"
                      className="flex-1"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {isRunning ? "Running..." : "Run"}
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </div>

                  {/* Output */}
                  {output && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Output</Label>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line">
                        {output}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockAssessmentInterface;
