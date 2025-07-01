
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Play, Send, CheckCircle, XCircle, Clock, Code, Maximize2, Minimize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestCase {
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

interface CompilerProps {
  problemTitle: string;
  problemStatement: string;
  difficulty: string;
  testCases: TestCase[];
  onSubmissionSuccess?: () => void;
  isFullScreen?: boolean;
  showTimer?: boolean;
  timeLeft?: number;
}

interface TestResult {
  testCase: number;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTime?: number;
  memoryUsed?: number;
}

const languages = [
  { value: "python", label: "Python 3", extension: "py" },
  { value: "cpp", label: "C++", extension: "cpp" },
  { value: "java", label: "Java", extension: "java" },
  { value: "javascript", label: "JavaScript", extension: "js" }
];

const defaultCode = {
  python: `# Write your solution here
def solution():
    # Your code goes here
    pass

# Example usage
result = solution()
print(result)`,
  cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // Write your solution here
    
    return 0;
}`,
  java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        // Write your solution here
        
    }
}`,
  javascript: `// Write your solution here
function solution() {
    // Your code goes here
    
}

// Example usage
const result = solution();
console.log(result);`
};

const CodeCompiler = ({ 
  problemTitle, 
  problemStatement, 
  difficulty, 
  testCases, 
  onSubmissionSuccess,
  isFullScreen = false,
  showTimer = false,
  timeLeft = 0
}: CompilerProps) => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(defaultCode.python);
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(defaultCode[selectedLanguage as keyof typeof defaultCode]);
  }, [selectedLanguage]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const executeCode = async (input: string = "") => {
    // Simulate code execution with Judge0-like API
    return new Promise<{ output: string; error?: string; executionTime: number }>((resolve) => {
      setTimeout(() => {
        try {
          // Mock execution logic
          const hasError = Math.random() < 0.1; // 10% chance of error
          
          if (hasError) {
            resolve({
              output: "",
              error: "Compilation Error: Invalid syntax on line 3",
              executionTime: 0
            });
          } else {
            let mockOutput = "";
            if (input.trim()) {
              mockOutput = `Input: ${input}\nProcessing...\nOutput: ${input.split('\n')[0] || 'Hello World'}`;
            } else {
              mockOutput = "Hello World\nCode executed successfully!";
            }
            
            resolve({
              output: mockOutput,
              executionTime: Math.floor(Math.random() * 100) + 50
            });
          }
        } catch (error) {
          resolve({
            output: "",
            error: "Runtime Error: " + String(error),
            executionTime: 0
          });
        }
      }, 1000 + Math.random() * 2000); // 1-3 seconds delay
    });
  };

  const handleRun = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please write some code first",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    setOutput("");

    try {
      const result = await executeCode(customInput);
      
      if (result.error) {
        setOutput(`❌ Error:\n${result.error}`);
        toast({
          title: "Compilation Error",
          description: "Check your code for syntax errors",
          variant: "destructive"
        });
      } else {
        setOutput(`✅ Execution completed in ${result.executionTime}ms\n\n${result.output}`);
        toast({
          title: "Code executed successfully",
          description: `Completed in ${result.executionTime}ms`
        });
      }
    } catch (error) {
      setOutput(`❌ Execution Error:\n${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please write some code first",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setTestResults([]);

    try {
      const results: TestResult[] = [];
      
      // Run code against all test cases
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const result = await executeCode(testCase.input);
        
        // Mock test case validation
        const passed = !result.error && Math.random() > 0.2; // 80% pass rate for demo
        
        results.push({
          testCase: i + 1,
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.error ? "Error" : result.output,
          executionTime: result.executionTime,
          memoryUsed: Math.floor(Math.random() * 50) + 10 // Mock memory usage
        });
      }

      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      
      if (allPassed) {
        setIsSolved(true);
        toast({
          title: "🎉 Congratulations!",
          description: "All test cases passed! Problem solved successfully."
        });
        onSubmissionSuccess?.();
      } else {
        const passedCount = results.filter(r => r.passed).length;
        toast({
          title: `${passedCount}/${results.length} test cases passed`,
          description: "Please review your solution and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to validate your solution. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleEditorFullScreen = () => {
    setIsEditorFullScreen(!isEditorFullScreen);
  };

  return (
    <div className={`flex flex-col h-full ${isFullScreen ? 'fixed inset-0 bg-white z-50' : ''}`}>
      {/* Header */}
      <div className="bg-gray-50 border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">{problemTitle}</h2>
            <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
            {isSolved && <CheckCircle className="h-5 w-5 text-green-600" />}
          </div>
          {showTimer && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Problem Statement Panel */}
        <div className={`${isEditorFullScreen ? 'hidden' : 'w-full lg:w-1/2'} border-r bg-white overflow-y-auto`}>
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Problem Statement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed">
                    {problemStatement}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className={`${isEditorFullScreen ? 'w-full' : 'w-full lg:w-1/2'} flex flex-col`}>
          {/* Editor Controls */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40">
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleEditorFullScreen}
                  className="hidden lg:flex"
                >
                  {isEditorFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleRun}
                  disabled={isRunning || isSolved}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  {isRunning ? "Running..." : "Run"}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isSolved}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>

            {/* Custom Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Input (Optional)
              </label>
              <Textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Enter your custom input here..."
                className="h-20 font-mono text-sm resize-none"
                disabled={isSolved}
              />
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 p-4">
            <Textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full min-h-[300px] font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your code here..."
              disabled={isSolved}
              style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
            />
          </div>

          {/* Output Section */}
          {(output || testResults.length > 0) && (
            <div className="border-t bg-gray-50 p-4 max-h-64 overflow-y-auto">
              {output && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Output:</h4>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded-md text-sm font-mono whitespace-pre-wrap">
                    {output}
                  </pre>
                </div>
              )}

              {testResults.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Test Results:</h4>
                  <div className="space-y-2">
                    {testResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          result.passed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {result.passed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className="font-medium text-sm">
                              Test Case {result.testCase}: {result.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {result.executionTime}ms | {result.memoryUsed}MB
                          </div>
                        </div>
                        {!result.passed && (
                          <div className="text-xs text-gray-600 space-y-1">
                            <div><strong>Expected:</strong> {result.expectedOutput}</div>
                            <div><strong>Got:</strong> {result.actualOutput}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeCompiler;
