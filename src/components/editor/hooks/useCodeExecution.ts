
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SubmissionResult, TestResult, TestCase, languages } from "../types";
import { RAPIDAPI_KEY, JUDGE0_API_URL } from "../types";

export const useCodeExecution = () => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const executeCode = async (code: string, selectedLanguage: string, input: string = ""): Promise<SubmissionResult | null> => {
    const currentLanguage = languages.find(lang => lang.value === selectedLanguage);
    if (!currentLanguage) return null;

    try {
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
          attempts++;
          continue;
        }

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

  const handleRun = async (code: string, selectedLanguage: string, customInput: string) => {
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
      const result = await executeCode(code, selectedLanguage, customInput);
      
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
        const outputText = result.stdout || "";
        setOutput(`✅ Execution completed in ${result.time}ms | Memory: ${result.memory}KB\n\n${outputText}`);
        toast({
          title: "Code executed successfully",
          description: `Completed in ${result.time}ms`
        });
      } else if (result.status.id === 6) {
        const errorText = result.compile_output || "Compilation error";
        setOutput(`❌ Compilation Error:\n${errorText}`);
        toast({
          title: "Compilation Error",
          description: "Check your code for syntax errors",
          variant: "destructive"
        });
      } else {
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

  const handleSubmit = async (
    code: string, 
    selectedLanguage: string, 
    testCases: TestCase[], 
    problemTitle: string,
    onSubmissionSuccess?: () => void
  ) => {
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
      
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const result = await executeCode(code, selectedLanguage, testCase.input);
        
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

  return {
    isRunning,
    isSubmitting,
    output,
    testResults,
    handleRun,
    handleSubmit
  };
};
