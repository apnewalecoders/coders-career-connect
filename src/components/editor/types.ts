
export interface TestCase {
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

export interface TestResult {
  testCase: number;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTime?: number;
  memoryUsed?: number;
}

export interface SubmissionResult {
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

export interface Language {
  value: string;
  label: string;
  id: number;
  extension: string;
}

export const languages: Language[] = [
  { value: "cpp", label: "C++", id: 54, extension: "cpp" },
  { value: "python", label: "Python 3", id: 71, extension: "py" },
  { value: "java", label: "Java", id: 62, extension: "java" },
  { value: "javascript", label: "JavaScript", id: 63, extension: "js" },
  { value: "csharp", label: "C#", id: 51, extension: "cs" },
  { value: "go", label: "Go", id: 60, extension: "go" }
];

export const defaultCode = {
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

export const RAPIDAPI_KEY = "4cf5a790e1mshbad966bd90a2923p114734jsn186981eeccb6";
export const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
