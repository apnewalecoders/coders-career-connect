
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { problems, Problem } from "@/data/practiceProblems";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Building2, Tag, ArrowLeft } from "lucide-react";
import MonacoCodeEditor from "@/components/editor/MonacoCodeEditor";

const PracticeProblemSolving = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const foundProblem = problems.find(p => p.id === parseInt(problemId || "1"));
    setProblem(foundProblem || null);
  }, [problemId]);

  const handleSubmissionSuccess = () => {
    setIsSolved(true);
    localStorage.setItem(`problem_${problemId}_solved`, 'true');
  };

  const handleExit = () => {
    navigate('/practice-problems');
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Problem Not Found</h1>
          <Button onClick={handleExit} variant="outline">
            Back to Problems
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExit}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="h-4 w-px bg-gray-300" />
            <h1 className="text-lg font-semibold text-gray-900">{problem.title}</h1>
            <Badge className={getDifficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
            {isSolved && (
              <Badge className="bg-green-100 text-green-800">Solved ✓</Badge>
            )}
          </div>
          <Button 
            onClick={handleExit}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content - LeetCode Style Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Problem Statement (50%) */}
        <div className="w-1/2 border-r border-gray-200 overflow-y-auto bg-white">
          <div className="p-6 space-y-6">
            {/* Problem Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{problem.title}</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {problem.description}
              </div>
            </div>

            {/* Examples */}
            {problem.testCases && problem.testCases.length > 0 && (
              <div className="space-y-4">
                {problem.testCases.slice(0, 2).map((testCase, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Example {index + 1}:</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-700">Input:</span>
                          <pre className="mt-1 text-sm text-gray-800 font-mono">{testCase.input}</pre>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Output:</span>
                          <pre className="mt-1 text-sm text-gray-800 font-mono">{testCase.expectedOutput}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Constraints */}
            {problem.constraints && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Constraints:</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                    {problem.constraints}
                  </pre>
                </div>
              </div>
            )}

            {/* Tags and Companies */}
            <div className="pt-4 border-t border-gray-200 space-y-4">
              {/* Companies */}
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Companies:</span>
                <div className="flex gap-2 flex-wrap">
                  {(problem.companies || ['Google', 'Microsoft']).map((company) => (
                    <Badge key={company} variant="outline" className="text-xs">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Topics:</span>
                <div className="flex gap-2 flex-wrap">
                  {(problem.topics || ['Array', 'Algorithms']).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor (50%) */}
        <div className="w-1/2 bg-white flex flex-col">
          <MonacoCodeEditor
            problemTitle={problem.title}
            problemStatement={problem.description}
            difficulty={problem.difficulty}
            testCases={problem.testCases}
            onSubmissionSuccess={handleSubmissionSuccess}
            layout="leetcode"
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeProblemSolving;
