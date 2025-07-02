import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Send, CheckCircle, XCircle, Clock, Code, Maximize2, Minimize2, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestCase {
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

interface EditorProps {
  problemTitle: string;
  problemStatement: string;
  difficulty: string;
  testCases?: TestCase[];
  onSubmissionSuccess?: () => void;
  isFullScreen?: boolean;
  showTimer?: boolean;
  timeLeft?: number;
  layout?: "default" | "compact" | "mobile";
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

interface SubmissionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string;
  memory: number;
}

const languages = [
  { value: "cpp", label: "C++", id: 54, extension: "cpp" },
  { value: "python", label: "Python 3", id: 71, extension: "py" },
  { value: "java", label: "Java", id: 62, extension: "java" },
  { value: "javascript", label: "JavaScript", id: 63, extension: "js" },
  { value: "csharp", label: "C#", id: 51, extension: "cs" },
  { value: "go", label: "Go", id: 60, extension: "go" }
];

const defaultCode = {
  cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // Write your solution here
    
    return 0;
}`,
  python: `# Write your solution here
def solution():
    # Your code goes here
    pass

# Example usage
result = solution()
print(result)`,
  java: `import java.util.*;
import java.io.*;

public class Main {
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
console.log(result);`,
  csharp: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Write your solution here
        
    }
}`,
  go: `package main

import "fmt"

func main() {
    // Write your solution here
    
}`
};

const RAPIDAPI_KEY = "4cf5a790e1mshbad966bd90a2923p114734jsn186981eeccb6";
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";

const MonacoCodeEditor = ({ 
  problemTitle, 
  problemStatement, 
  difficulty, 
  testCases = [], 
  onSubmissionSuccess,
  isFullScreen = false,
  showTimer = false,
  timeLeft = 0,
  layout = "default"
}: EditorProps) => {
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const editorRef = useRef(null);

  // Load saved code from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem(`code_${problemTitle}_${selectedLanguage}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(defaultCode[selectedLanguage as keyof typeof defaultCode]);
    }
  }, [selectedLanguage, problemTitle]);

  // Save code to localStorage
  const saveCode = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`code_${problemTitle}_${selectedLanguage}`, newCode);
  };

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

  const executeCode = async (input: string = ""): Promise<SubmissionResult | null> => {
    const currentLanguage = languages.find(lang => lang.value === selectedLanguage);
    if (!currentLanguage) return null;

    try {
      // Create submission
      const submissionResponse = await fetch(`${JUDGE0_API_URL}?base64_encoded=true&wait=false`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          language_id: currentLanguage.id,
          source_code: btoa(code),
          stdin: input ? btoa(input) : null
        })
      });

      if (!submissionResponse.ok) {
        throw new Error('Failed to submit code');
      }

      const submissionData = await submissionResponse.json();
      const token = submissionData.token;

      // Poll for result
      let attempts = 0;
      const maxAttempts = 10;
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const resultResponse = await fetch(`${JUDGE0_API_URL}/${token}?base64_encoded=true`, {
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        });

        if (!resultResponse.ok) {
          throw new Error('Failed to get result');
        }

        const result = await resultResponse.json();
        
        if (result.status.id <= 2) {
          // Still processing
          attempts++;
          continue;
        }

        // Decode base64 outputs
        return {
          stdout: result.stdout ? atob(result.stdout) : null,
          stderr: result.stderr ? atob(result.stderr) : null,
          compile_output: result.compile_output ? atob(result.compile_output) : null,
          status: result.status,
          time: result.time || "0",
          memory: result.memory || 0
        };
      }

      throw new Error('Execution timeout');
    } catch (error) {
      console.error('Code execution error:', error);
      return null;
    }
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
      
      if (!result) {
        setOutput("❌ Execution failed. Please try again.");
        toast({
          title: "Execution Error",
          description: "Failed to execute code. Please try again.",
          variant: "destructive"
        });
        return;
      }

      if (result.status.id === 3) {
        // Accepted
        const outputText = result.stdout || "";
        setOutput(`✅ Execution completed in ${result.time}ms | Memory: ${result.memory}KB\n\n${outputText}`);
        toast({
          title: "Code executed successfully",
          description: `Completed in ${result.time}ms`
        });
      } else if (result.status.id === 6) {
        // Compilation Error
        const errorText = result.compile_output || "Compilation error";
        setOutput(`❌ Compilation Error:\n${errorText}`);
        toast({
          title: "Compilation Error",
          description: "Check your code for syntax errors",
          variant: "destructive"
        });
      } else {
        // Runtime Error or other
        const errorText = result.stderr || result.status.description;
        setOutput(`❌ Runtime Error:\n${errorText}`);
        toast({
          title: "Runtime Error",
          description: result.status.description,
          variant: "destructive"
        });
      }
    } catch (error) {
      setOutput(`❌ Execution Error:\n${error}`);
      toast({
        title: "Execution Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
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

    if (testCases.length === 0) {
      toast({
        title: "No test cases",
        description: "No test cases available for this problem",
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
        
        if (!result) {
          results.push({
            testCase: i + 1,
            passed: false,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: "Execution failed",
            executionTime: 0,
            memoryUsed: 0
          });
          continue;
        }

        const actualOutput = (result.stdout || "").trim();
        const expectedOutput = testCase.expectedOutput.trim();
        const passed = result.status.id === 3 && actualOutput === expectedOutput;
        
        results.push({
          testCase: i + 1,
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: actualOutput || (result.stderr || result.status.description),
          executionTime: parseFloat(result.time || "0") * 1000,
          memoryUsed: result.memory || 0
        });
      }

      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      
      if (allPassed) {
        setIsSolved(true);
        localStorage.setItem(`problem_${problemTitle}_solved`, 'true');
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Compact layout for the right sidebar
  if (layout === "compact") {
    return (
      <div className="h-full flex flex-col bg-[#1e1e1e]">
        {/* Language Selector */}
        <div className="p-3 border-b border-[#3e3e42] bg-[#252526]">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full bg-[#3c3c3c] border-[#3e3e42] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#252526] border-[#3e3e42]">
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="text-white hover:bg-[#3c3c3c]">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Code Editor */}
        <div className="flex-1 min-h-[300px]">
          <Editor
            height="100%"
            language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
            theme="vs-dark"
            value={code}
            onChange={(value) => saveCode(value || "")}
            options={{
              fontSize: 13,
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
              formatOnType: true
            }}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="p-3 border-t border-[#3e3e42] bg-[#252526]">
          <div className="flex gap-2">
            <Button
              onClick={handleRun}
              disabled={isRunning || isSolved}
              variant="outline"
              size="sm"
              className="flex-1 bg-[#0e639c] hover:bg-[#1177bb] border-[#0e639c] text-white"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run"}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || isSolved}
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>

        {/* Custom Input */}
        <div className="p-3 border-t border-[#3e3e42] bg-[#252526]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Custom Input
          </label>
          <Textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter your test input here..."
            className="h-20 font-mono text-sm bg-[#3c3c3c] border-[#3e3e42] text-white placeholder-gray-400 resize-none"
            disabled={isSolved}
          />
        </div>

        {/* Output Section */}
        {(output || testResults.length > 0) && (
          <div className="border-t border-[#3e3e42] bg-[#252526] p-3 max-h-64 overflow-y-auto">
            {output && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-300 mb-2 text-sm">Output:</h4>
                <pre className="bg-[#1e1e1e] text-green-400 p-3 rounded-md text-xs font-mono whitespace-pre-wrap border border-[#3e3e42]">
                  {output}
                </pre>
              </div>
            )}

            {testResults.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-300 mb-2 text-sm">Test Results:</h4>
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg border text-xs ${
                        result.passed 
                          ? 'bg-green-900/20 border-green-600/30' 
                          : 'bg-red-900/20 border-red-600/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {result.passed ? (
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-400" />
                          )}
                          <span className="font-medium text-white">
                            Test {result.testCase}: {result.passed ? "Passed" : "Failed"}
                          </span>
                        </div>
                        <div className="text-gray-400">
                          {result.executionTime?.toFixed(2)}ms
                        </div>
                      </div>
                      {!result.passed && (
                        <div className="text-gray-300 space-y-1">
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
    );
  }

  // Default layout (existing full layout)
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
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
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

          {/* Monaco Editor */}
          <div className="flex-1 min-h-[400px]">
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
                formatOnType: true
              }}
              onMount={(editor) => {
                editorRef.current = editor;
              }}
            />
          </div>

          {/* Output Section */}
          {(output || testResults.length > 0) && (
            <div className="border-t bg-gray-50 p-4 max-h-64 overflow-y-auto">
              {output && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Output:</h4>
                  <pre className={`${isDarkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-800'} p-3 rounded-md text-sm font-mono whitespace-pre-wrap`}>
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
                            {result.executionTime?.toFixed(2)}ms | {result.memoryUsed}KB
                          </div>
                        </div>
                        {!result.passed && (
                          <div className="text-xs text-gray-600 space-y-1">
                            <div><strong>Input:</strong> {result.input}</div>
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

export default MonacoCodeEditor;
