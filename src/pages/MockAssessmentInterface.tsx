
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, LogOut, Play, Send, RotateCcw, Sun, Moon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
      <Tabs value={currentQuestionIndex.toString()} onValueChange={(value) => setCurrentQuestionIndex(parseInt(value))} className="flex-shrink-0">
        <div className="bg-gray-50 border-b px-4 py-2">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="0" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${submissions[0] ? 'bg-green-500' : 'bg-gray-300'}`} />
                1
              </div>
            </TabsTrigger>
            <TabsTrigger value="1" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${submissions[1] ? 'bg-green-500' : 'bg-gray-300'}`} />
                2
              </div>
            </TabsTrigger>
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
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {currentProblem.difficulty}
                      </span>
                      {isCurrentSubmitted && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          Submitted
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {currentProblem.statement}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Example</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="text-gray-700 whitespace-pre-line">
                          {currentProblem.sampleInput}
                        </div>
                        <div className="text-gray-700 whitespace-pre-line">
                          {currentProblem.sampleOutput}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Constraints</h3>
                    <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                      {currentProblem.constraints}
                    </div>
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
                        <Select value={language} onValueChange={setLanguage} disabled={isCurrentSubmitted}>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setDarkMode(!darkMode)}
                        disabled={isCurrentSubmitted}
                      >
                        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleReset}
                        disabled={isCurrentSubmitted}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="flex-1 min-h-0">
                  <textarea
                    value={codes[currentQuestionIndex]}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    className={`w-full h-full p-4 font-mono text-sm border-0 resize-none focus:outline-none ${
                      darkMode 
                        ? 'bg-gray-900 text-gray-100' 
                        : 'bg-white text-gray-900 border-t border-gray-200'
                    }`}
                    placeholder="Write your solution here..."
                    disabled={isCurrentSubmitted}
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
                      disabled={isCurrentSubmitted}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleRun}
                      disabled={isRunning || isCurrentSubmitted}
                      variant="outline"
                      className="flex-1"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {isRunning ? "Running..." : "Run"}
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isCurrentSubmitted}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isCurrentSubmitted ? "Submitted" : "Submit"}
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

export default MockAssessmentInterface;
