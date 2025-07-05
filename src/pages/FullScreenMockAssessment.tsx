
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, LogOut, Play, Send, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import MonacoCodeEditor from "@/components/editor/MonacoCodeEditor";

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
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
    testCases: [
      { input: "()", expectedOutput: "true" },
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" }
    ]
  }
];

const FullScreenMockAssessment = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [codes, setCodes] = useState<{[key: number]: string}>({
    0: "def twoSum(nums, target):\n    # Write your solution here\n    pass",
    1: "def isValid(s):\n    # Write your solution here\n    pass"
  });
  const [language, setLanguage] = useState("python");
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [outputExpanded, setOutputExpanded] = useState(false);
  const [questionStatus, setQuestionStatus] = useState<{[key: number]: 'unsolved' | 'attempted' | 'solved'}>({
    0: 'unsolved',
    1: 'unsolved'
  });

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

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        // User exited full screen - show warning
        toast({
          title: "Full Screen Mode Required",
          description: "Please stay in full screen mode during the assessment",
          variant: "destructive"
        });
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [toast]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    navigate(`/mock-assessment/${assessmentId}/results`, {
      state: { timeExpired: true, questionStatus }
    });
  };

  const handleExit = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    navigate(`/mock-assessment/${assessmentId}/results`, {
      state: { timeExpired: false, questionStatus }
    });
  };

  const handleCodeChange = (value: string) => {
    setCodes(prev => ({ ...prev, [currentQuestion]: value }));
    if (questionStatus[currentQuestion] === 'unsolved') {
      setQuestionStatus(prev => ({ ...prev, [currentQuestion]: 'attempted' }));
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutputExpanded(true);
    
    // Simulate code execution
    setTimeout(() => {
      let result = "";
      if (customInput.trim()) {
        result = `Input: ${customInput}\nOutput: [Sample output for custom input]`;
      } else {
        result = `Sample Test Case:\n${mockProblems[currentQuestion].examples[0].input}\nOutput: ${mockProblems[currentQuestion].examples[0].output}\n\n✅ Sample test passed`;
      }
      setOutput(result);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setQuestionStatus(prev => ({ ...prev, [currentQuestion]: 'solved' }));
        toast({
          title: "Success!",
          description: "All test cases passed!"
        });
        setOutput("✅ All test cases passed!\n\nTest Case 1: Passed\nTest Case 2: Passed\nTest Case 3: Passed");
      } else {
        toast({
          title: "Some tests failed",
          description: "Please review your solution",
          variant: "destructive"
        });
        setOutput("❌ Some test cases failed\n\nTest Case 1: Passed\nTest Case 2: Failed\nTest Case 3: Passed");
      }
      
      setOutputExpanded(true);
      setIsSubmitting(false);
    }, 3000);
  };

  const handleReset = () => {
    const defaultCode = currentQuestion === 0 
      ? "def twoSum(nums, target):\n    # Write your solution here\n    pass"
      : "def isValid(s):\n    # Write your solution here\n    pass";
    setCodes(prev => ({ ...prev, [currentQuestion]: defaultCode }));
  };

  const currentProblem = mockProblems[currentQuestion];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Fixed Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between max-w-full">
          <h1 className="text-lg font-semibold text-gray-900">Mock Assessment #{assessmentId}</h1>
          
          <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
            <Clock className="h-5 w-5 text-red-600" />
            <span className="font-mono text-xl font-bold text-red-600">
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

      {/* Question Navigation Tabs */}
      <Tabs value={currentQuestion.toString()} onValueChange={(value) => setCurrentQuestion(parseInt(value))} className="flex-shrink-0">
        <div className="bg-gray-50 border-b px-4 py-2">
          <TabsList className="grid w-fit grid-cols-2">
            {mockProblems.map((_, index) => (
              <TabsTrigger 
                key={index} 
                value={index.toString()}
                className="relative data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    questionStatus[index] === 'solved' ? 'bg-green-500' :
                    questionStatus[index] === 'attempted' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`} />
                  Question {index + 1}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Panel - Problem Description */}
            <ResizablePanel defaultSize={45} minSize={30} maxSize={60}>
              <div className="h-full overflow-y-auto p-6 bg-white">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{currentProblem.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currentProblem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        currentProblem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {currentProblem.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {currentProblem.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Examples</h3>
                    <div className="space-y-4">
                      {currentProblem.examples.map((example, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium text-gray-900">Input: </span>
                              <code className="bg-gray-200 px-2 py-1 rounded text-sm">{example.input}</code>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">Output: </span>
                              <code className="bg-gray-200 px-2 py-1 rounded text-sm">{example.output}</code>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="font-medium text-gray-900">Explanation: </span>
                                <span className="text-gray-700">{example.explanation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Constraints</h3>
                    <ul className="space-y-1 text-gray-700">
                      {currentProblem.constraints.map((constraint, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span>•</span>
                          <code className="text-sm bg-gray-100 px-1 rounded">{constraint}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="w-1 bg-gray-200 hover:bg-gray-300" />

            {/* Right Panel - Code Editor */}
            <ResizablePanel defaultSize={55} minSize={40}>
              <div className="h-full flex flex-col bg-white">
                {/* Editor Header */}
                <div className="border-b border-gray-200 p-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="language">Language:</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="flex-1 min-h-0">
                  <textarea
                    value={codes[currentQuestion]}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    className="w-full h-full p-4 font-mono text-sm border-0 resize-none focus:outline-none bg-gray-900 text-gray-100"
                    placeholder="Write your solution here..."
                    style={{ minHeight: '400px' }}
                  />
                </div>

                {/* Controls */}
                <div className="border-t border-gray-200 p-4 flex-shrink-0 space-y-4">
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
                      disabled={isSubmitting}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </div>

                {/* Output Section */}
                {output && (
                  <div className="border-t border-gray-200 flex-shrink-0">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <h4 className="font-medium text-gray-900">Output</h4>
                    </div>
                    <div className="p-4 max-h-48 overflow-y-auto">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                        {output}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Tabs>
    </div>
  );
};

export default FullScreenMockAssessment;
