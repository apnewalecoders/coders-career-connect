
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Play, Send, CheckCircle, XCircle, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock problem data - in a real app, this would come from an API
const problems = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    inputFormat: "The first line contains the number of elements n. The second line contains n space-separated integers representing the array. The third line contains the target integer.",
    outputFormat: "Return the indices of the two numbers that add up to the target.",
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    sampleInput: `4
2 7 11 15
9`,
    sampleOutput: `[0, 1]`,
    askedBy: "Google",
    tags: ["Array", "Hash Table"],
    difficulty: "Easy",
    testCases: [
      { input: "4\n2 7 11 15\n9", expectedOutput: "[0, 1]" },
      { input: "3\n3 2 4\n6", expectedOutput: "[1, 2]" },
      { input: "2\n3 3\n6", expectedOutput: "[0, 1]" }
    ]
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    inputFormat: "A single line containing the string s.",
    outputFormat: "Return the length of the longest substring without repeating characters.",
    constraints: [
      "0 ≤ s.length ≤ 5 * 10⁴",
      "s consists of English letters, digits, symbols and spaces."
    ],
    sampleInput: `abcabcbb`,
    sampleOutput: `3`,
    askedBy: "Amazon",
    tags: ["String", "Sliding Window", "Hash Table"],
    difficulty: "Medium",
    testCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" },
      { input: "pwwkew", expectedOutput: "3" }
    ]
  }
];

const languages = [
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "javascript", label: "JavaScript" }
];

const defaultCode = {
  python: `def solution():
    # Write your code here
    pass

# Test your solution
result = solution()
print(result)`,
  java: `public class Solution {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello World");
    }
}`,
  cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Write your code here
    cout << "Hello World" << endl;
    return 0;
}`,
  javascript: `function solution() {
    // Write your code here
    return "Hello World";
}

console.log(solution());`
};

const PracticeProblemSolving = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [problem, setProblem] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(defaultCode.python);
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    const foundProblem = problems.find(p => p.id === parseInt(problemId || "1"));
    setProblem(foundProblem);
    
    if (foundProblem) {
      setCustomInput(foundProblem.sampleInput);
    }
  }, [problemId]);

  useEffect(() => {
    setCode(defaultCode[selectedLanguage as keyof typeof defaultCode]);
  }, [selectedLanguage]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    
    // Simulate code execution
    setTimeout(() => {
      try {
        // Mock execution result
        const mockOutput = customInput ? `Input: ${customInput}\nOutput: Processing...` : "No input provided";
        setOutput(mockOutput);
        
        toast({
          title: "Code executed successfully",
          description: "Check the output below",
        });
      } catch (error) {
        setOutput("Error: " + error);
      } finally {
        setIsRunning(false);
      }
    }, 1500);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTestResults([]);
    
    // Simulate test case evaluation
    setTimeout(() => {
      if (!problem) return;
      
      const results = problem.testCases.map((testCase: any, index: number) => ({
        testCase: index + 1,
        passed: Math.random() > 0.3, // Mock: 70% pass rate
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: testCase.expectedOutput // Mock: same as expected for passed tests
      }));
      
      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      
      if (allPassed) {
        setIsSolved(true);
        toast({
          title: "🎉 Congratulations!",
          description: "All test cases passed! Problem solved successfully.",
        });
      } else {
        toast({
          title: "Some test cases failed",
          description: "Please review your solution and try again.",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Problem not found</p>
          <Button 
            onClick={() => navigate("/practice-problems")}
            className="mt-4"
            variant="outline"
          >
            Back to Problems
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/practice-problems")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Practice Problems
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">{problem.title}</h1>
              {isSolved && <CheckCircle className="h-5 w-5 text-green-600" />}
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(problem.difficulty)}>
                {problem.difficulty}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left Panel - Problem Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Problem Statement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{problem.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Input Format</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{problem.inputFormat}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Output Format</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{problem.outputFormat}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Constraints</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {problem.constraints.map((constraint: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sample Input</h4>
                    <pre className="text-sm bg-gray-50 p-3 rounded border text-gray-700 whitespace-pre-wrap">
                      {problem.sampleInput}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sample Output</h4>
                    <pre className="text-sm bg-gray-50 p-3 rounded border text-gray-700 whitespace-pre-wrap">
                      {problem.sampleOutput}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Asked by</p>
                    <p className="font-semibold text-gray-900">{problem.askedBy}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Code Editor</CardTitle>
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
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                  className="min-h-[300px] font-mono text-sm"
                  disabled={isSolved}
                />
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Custom Input</h4>
                  <Textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter your custom input..."
                    className="min-h-[100px] font-mono text-sm"
                    disabled={isSolved}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleRun}
                    disabled={isRunning || isSolved}
                    className="flex items-center gap-2"
                    variant="outline"
                  >
                    <Play className="h-4 w-4" />
                    {isRunning ? "Running..." : "Run"}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isSolved}
                    className="flex items-center gap-2 bg-brand-red hover:bg-red-500 text-white"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output Section */}
            {(output || testResults.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Output</CardTitle>
                </CardHeader>
                <CardContent>
                  {output && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Execution Result</h4>
                      <pre className="bg-gray-50 p-3 rounded border text-sm whitespace-pre-wrap">
                        {output}
                      </pre>
                    </div>
                  )}
                  
                  {testResults.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Test Case Results</h4>
                      <div className="space-y-2">
                        {testResults.map((result, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded border ${
                              result.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {result.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span className="font-medium">
                                Test Case {result.testCase}: {result.passed ? "Passed" : "Failed"}
                              </span>
                            </div>
                            {!result.passed && (
                              <div className="text-sm text-gray-600">
                                <p>Expected: {result.expectedOutput}</p>
                                <p>Got: {result.actualOutput}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeProblemSolving;
