
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock, Play, Send, ChevronDown, ChevronUp } from "lucide-react";

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
  const [codes, setCodes] = useState<{[key: number]: string}>({
    0: "// Write your solution here\n",
    1: "// Write your solution here\n"
  });
  const [customInputs, setCustomInputs] = useState<{[key: number]: string}>({0: "", 1: ""});
  const [outputs, setOutputs] = useState<{[key: number]: string}>({0: "", 1: ""});
  const [languages, setLanguages] = useState<{[key: number]: string}>({0: "python", 1: "python"});
  const [isRunning, setIsRunning] = useState<{[key: number]: boolean}>({0: false, 1: false});
  const [submissions, setSubmissions] = useState<{[key: number]: boolean}>({0: false, 1: false});
  const [outputExpanded, setOutputExpanded] = useState<{[key: number]: boolean}>({0: false, 1: false});

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

  const handleRun = async (questionIndex: number) => {
    setIsRunning(prev => ({ ...prev, [questionIndex]: true }));
    setOutputExpanded(prev => ({ ...prev, [questionIndex]: true }));
    
    // Simulate code execution
    setTimeout(() => {
      const customInput = customInputs[questionIndex];
      let output = "";
      
      if (customInput.trim()) {
        output = `Output for input: ${customInput}\n[1, 0]`;
      } else {
        if (questionIndex === 0) {
          output = "Sample Output:\n[0, 1]\n\n✅ Test Case 1: Passed\n✅ Test Case 2: Passed\n✅ Test Case 3: Passed";
        } else {
          output = "Sample Output:\ntrue\n\n✅ Test Case 1: Passed\n✅ Test Case 2: Passed\n❌ Test Case 3: Failed (Expected: false, Got: true)";
        }
      }
      
      setOutputs(prev => ({ ...prev, [questionIndex]: output }));
      setIsRunning(prev => ({ ...prev, [questionIndex]: false }));
    }, 2000);
  };

  const handleSubmit = (questionIndex: number) => {
    setSubmissions(prev => ({ ...prev, [questionIndex]: true }));
    
    // Check if all questions are submitted
    const newSubmissions = { ...submissions, [questionIndex]: true };
    const allSubmitted = Object.keys(newSubmissions).every(key => newSubmissions[parseInt(key)]);
    
    if (allSubmitted) {
      navigate(`/mock-assessment/${assessmentId}/results`, {
        state: { submissions: newSubmissions, timeExpired: false }
      });
    }
  };

  const handleCodeChange = (questionIndex: number, value: string) => {
    setCodes(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleLanguageChange = (questionIndex: number, language: string) => {
    setLanguages(prev => ({ ...prev, [questionIndex]: language }));
  };

  const handleCustomInputChange = (questionIndex: number, value: string) => {
    setCustomInputs(prev => ({ ...prev, [questionIndex]: value }));
  };

  const toggleOutput = (questionIndex: number) => {
    setOutputExpanded(prev => ({ ...prev, [questionIndex]: !prev[questionIndex] }));
  };

  const submittedCount = Object.values(submissions).filter(Boolean).length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Fixed Timer Header */}
        <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900">
                Mock Assessment - {submittedCount} of {codingProblems.length} Submitted
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

        <div className="container mx-auto px-4 py-6 space-y-8">
          {codingProblems.map((problem, questionIndex) => (
            <div key={problem.id} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Left Panel - Problem Statement */}
              <Card className="h-fit">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900">
                      Question {questionIndex + 1}: {problem.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                        {problem.difficulty}
                      </span>
                      {submissions[questionIndex] && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                          Submitted
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Problem Statement</h3>
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {problem.statement}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Constraints</h3>
                    <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                      {problem.constraints}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Example</h3>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-700 whitespace-pre-line mb-2">
                        {problem.sampleInput}
                      </div>
                      <div className="text-gray-700 whitespace-pre-line">
                        {problem.sampleOutput}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Panel - Code Editor */}
              <Card className="h-fit">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Code Editor - Question {questionIndex + 1}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`language-${questionIndex}`}>Language:</Label>
                      <select
                        id={`language-${questionIndex}`}
                        value={languages[questionIndex]}
                        onChange={(e) => handleLanguageChange(questionIndex, e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm"
                        disabled={submissions[questionIndex]}
                      >
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="javascript">JavaScript</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Code Editor Area */}
                  <div>
                    <textarea
                      value={codes[questionIndex]}
                      onChange={(e) => handleCodeChange(questionIndex, e.target.value)}
                      className="w-full h-64 p-4 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your solution here..."
                      disabled={submissions[questionIndex]}
                    />
                  </div>

                  {/* Custom Input */}
                  <div>
                    <Label htmlFor={`custom-input-${questionIndex}`} className="text-sm font-medium mb-2 block">
                      Custom Input (Optional)
                    </Label>
                    <Input
                      id={`custom-input-${questionIndex}`}
                      value={customInputs[questionIndex]}
                      onChange={(e) => handleCustomInputChange(questionIndex, e.target.value)}
                      placeholder="Enter custom test input..."
                      className="font-mono text-sm"
                      disabled={submissions[questionIndex]}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleRun(questionIndex)}
                      disabled={isRunning[questionIndex] || submissions[questionIndex]}
                      variant="outline"
                      className="flex-1"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {isRunning[questionIndex] ? "Running..." : "Run"}
                    </Button>
                    <Button
                      onClick={() => handleSubmit(questionIndex)}
                      disabled={submissions[questionIndex]}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {submissions[questionIndex] ? "Submitted" : "Submit"}
                    </Button>
                  </div>

                  {/* Output Section */}
                  {outputs[questionIndex] && (
                    <div className="border rounded-lg">
                      <div 
                        className="flex items-center justify-between p-3 bg-gray-50 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleOutput(questionIndex)}
                      >
                        <Label className="text-sm font-medium">Output & Test Results</Label>
                        {outputExpanded[questionIndex] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                      {outputExpanded[questionIndex] && (
                        <div className="p-4">
                          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line max-h-48 overflow-y-auto">
                            {outputs[questionIndex]}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Final Submit Section */}
          {submittedCount === codingProblems.length && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  All Questions Submitted!
                </h3>
                <p className="text-green-700 mb-4">
                  You have successfully submitted all {codingProblems.length} questions. 
                  You can continue reviewing your solutions or finish the assessment.
                </p>
                <Button 
                  onClick={() => navigate(`/mock-assessment/${assessmentId}/results`, {
                    state: { submissions, timeExpired: false }
                  })}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Finish Assessment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MockAssessmentInterface;
