import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, LogOut, Play, Send, RotateCcw, Settings, Sun, Moon, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Editor from "@monaco-editor/react";
import { languages, defaultCode } from "@/components/editor/types";
import { useCodeExecution } from "@/components/editor/hooks/useCodeExecution";
import OutputSection from "@/components/editor/components/OutputSection";

const mockProblems = [
  {
    id: 1,
    title: "Fibonacci Number",
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given n, calculate F(n).`,
    examples: [
      {
        input: "n = 2",
        output: "1",
        explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1."
      },
      {
        input: "n = 3",
        output: "2",
        explanation: "F(3) = F(2) + F(1) = 1 + 1 = 2."
      },
      {
        input: "n = 4",
        output: "3"
      }
    ],
    constraints: [
      "0 ≤ n ≤ 30"
    ],
    difficulty: "Easy",
    testCases: [
      { input: "2", expectedOutput: "1" },
      { input: "3", expectedOutput: "2" },
      { input: "4", expectedOutput: "3" }
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
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(defaultCode.python);
  const [customInput, setCustomInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const [questionStatus, setQuestionStatus] = useState<{[key: number]: 'unsolved' | 'attempted' | 'solved'}>({
    0: 'unsolved',
    1: 'unsolved'
  });

  const {
    isRunning,
    isSubmitting,
    output,
    testResults,
    handleRun,
    handleSubmit
  } = useCodeExecution();

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
      if (!document.fullscreenElement && !hasAutoSubmitted) {
        setHasAutoSubmitted(true);
        toast({
          title: "Assessment Auto-Submitted",
          description: "You exited full-screen mode. Your assessment has been automatically submitted.",
          variant: "destructive"
        });
        
        setTimeout(() => {
          navigate(`/mock-assessment/${assessmentId}/results`, {
            state: { 
              timeExpired: false, 
              questionStatus,
              autoSubmitted: true 
            }
          });
        }, 2000);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [toast, navigate, assessmentId, questionStatus, hasAutoSubmitted]);

  // Load saved code
  useEffect(() => {
    const savedCode = localStorage.getItem(`mock_code_${currentQuestion}_${selectedLanguage}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(defaultCode[selectedLanguage as keyof typeof defaultCode]);
    }
  }, [selectedLanguage, currentQuestion]);

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

  const saveCode = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`mock_code_${currentQuestion}_${selectedLanguage}`, newCode);
    if (questionStatus[currentQuestion] === 'unsolved') {
      setQuestionStatus(prev => ({ ...prev, [currentQuestion]: 'attempted' }));
    }
  };

  const resetCode = () => {
    const freshCode = defaultCode[selectedLanguage as keyof typeof defaultCode];
    setCode(freshCode);
    localStorage.removeItem(`mock_code_${currentQuestion}_${selectedLanguage}`);
  };

  const onRun = () => {
    handleRun(code, selectedLanguage, customInput);
    setIsOutputVisible(true);
  };

  const onSubmit = () => {
    const currentProblem = mockProblems[currentQuestion];
    handleSubmit(code, selectedLanguage, currentProblem.testCases || [], currentProblem.title, () => {
      setQuestionStatus(prev => ({ ...prev, [currentQuestion]: 'solved' }));
      toast({
        title: "Code Submitted!",
        description: `Question ${currentQuestion + 1} has been submitted successfully.`
      });
    });
    setIsOutputVisible(true);
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockProblems.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const currentProblem = mockProblems[currentQuestion];
  const hasOutput = output || testResults.length > 0;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">Mock Assessment #{assessmentId}</h1>
            <div className="flex gap-2">
              {mockProblems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-blue-600 text-white'
                      : questionStatus[index] === 'solved'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : questionStatus[index] === 'attempted'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                  {questionStatus[index] === 'solved' && ' ✓'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
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
                    Are you sure you want to exit? Your progress will be saved and the assessment will be automatically submitted.
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
            <div className="h-full bg-white overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Problem Header */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{currentProblem.title}</h2>
                    <Badge className={`${
                      currentProblem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      currentProblem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {currentProblem.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                    {currentProblem.description}
                  </div>
                </div>

                {/* Examples */}
                {currentProblem.examples && currentProblem.examples.length > 0 && (
                  <div className="space-y-4">
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-semibold text-gray-900 text-sm">Example {index + 1}:</h3>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-gray-700 text-sm">Input:</span>
                              <pre className="mt-1 text-xs text-gray-800 font-mono bg-white p-2 rounded border">
                                {example.input}
                              </pre>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700 text-sm">Output:</span>
                              <pre className="mt-1 text-xs text-gray-800 font-mono bg-white p-2 rounded border">
                                {example.output}
                              </pre>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="font-medium text-gray-700 text-sm">Explanation:</span>
                                <p className="mt-1 text-xs text-gray-700">{example.explanation}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {currentProblem.constraints && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Constraints:</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <ul className="space-y-1 text-xs text-gray-700">
                        {currentProblem.constraints.map((constraint, index) => (
                          <li key={index} className="font-mono">{constraint}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="w-1 bg-gray-200 hover:bg-gray-300" />

          {/* Right Panel - Code Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <div className="h-full bg-white flex flex-col">
              {/* Navigation Bar */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestion === 0}
                      className="h-8 px-3 text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      Prev
                    </Button>
                    
                    <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded text-sm font-medium text-gray-700">
                      {currentQuestion + 1} / {mockProblems.length}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNextQuestion}
                      disabled={currentQuestion === mockProblems.length - 1}
                      className="h-8 px-3 text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      Next
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select value={isOutputVisible ? "console" : "hidden"} onValueChange={(value) => setIsOutputVisible(value === "console")}>
                      <SelectTrigger className="w-28 h-8 text-sm">
                        <SelectValue placeholder="Console" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="console">Console</SelectItem>
                        <SelectItem value="hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Editor Header */}
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-36 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {questionStatus[currentQuestion] === 'solved' && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Solved ✓
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetCode}
                      className="h-8 px-2 text-xs"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="h-8 px-2"
                    >
                      {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className={`flex-1 ${hasOutput && isOutputVisible ? 'min-h-0' : ''}`}>
                <Editor
                  height="100%"
                  language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
                  theme={isDarkMode ? 'vs-dark' : 'light'}
                  value={code}
                  onChange={(value) => saveCode(value || "")}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    renderLineHighlight: 'line',
                    lineNumbers: 'on',
                    folding: true,
                    bracketMatching: 'always',
                    autoIndent: 'full',
                    formatOnPaste: true,
                    formatOnType: true,
                    padding: { top: 16, bottom: 16 }
                  }}
                />
              </div>

              {/* Output Section */}
              {hasOutput && (
                <div className={`border-t border-gray-200 ${isOutputVisible ? 'block' : 'hidden'}`}>
                  <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 text-sm">Console</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOutputVisible(!isOutputVisible)}
                        className="h-6 px-2"
                      >
                        {isOutputVisible ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronUp className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-64">
                    <OutputSection
                      output={output}
                      testResults={testResults}
                      isDarkMode={isDarkMode}
                      layout="default"
                    />
                  </div>
                </div>
              )}

              {/* Custom Input Section */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Input
                  </label>
                  <Textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter your test input here..."
                    className="h-20 font-mono text-sm resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons - Sticky at bottom */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-3 justify-end">
                  <Button
                    onClick={onRun}
                    disabled={isRunning}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                  <Button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    size="sm"
                    className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default FullScreenMockAssessment;
