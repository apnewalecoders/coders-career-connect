
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { problems, Problem } from "@/data/practiceProblems";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Building2, Tag } from "lucide-react";
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
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Problem Not Found</h1>
          <Button onClick={handleExit} variant="outline">
            Back to Problems
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-600 text-white";
      case "medium": return "bg-yellow-600 text-white";
      case "hard": return "bg-red-600 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">{problem.title}</h1>
            <Badge className={getDifficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
            {isSolved && (
              <Badge className="bg-green-600 text-white">Solved ✓</Badge>
            )}
          </div>
          <Button 
            onClick={handleExit}
            variant="destructive"
            size="sm"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Exit
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Problem Statement (70%) */}
        <div className="w-full lg:w-[70%] bg-gray-900 border-r border-gray-700 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Problem Statement */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  Problem Statement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {problem.description}
                </div>
              </CardContent>
            </Card>

            {/* Sample Test Cases */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Sample Test Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {problem.testCases?.slice(0, 2).map((testCase, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-sm font-semibold text-blue-400">
                      Sample Input {index}:
                    </h4>
                    <div className="bg-gray-900 p-3 rounded-lg font-mono text-sm text-gray-300">
                      {testCase.input}
                    </div>
                    <h4 className="text-sm font-semibold text-green-400">
                      Sample Output {index}:
                    </h4>
                    <div className="bg-gray-900 p-3 rounded-lg font-mono text-sm text-gray-300">
                      {testCase.expectedOutput}
                    </div>
                    {index < problem.testCases.slice(0, 2).length - 1 && (
                      <hr className="border-gray-700" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Constraints */}
            {problem.constraints && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Constraints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                    {problem.constraints}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bottom Info */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700">
              {/* Asked By */}
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Asked By:</span>
                <div className="flex gap-2">
                  {(problem.companies || ['Google', 'Microsoft']).map((company) => (
                    <Badge key={company} variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Topics:</span>
                <div className="flex gap-2">
                  {(problem.topics || ['Array', 'Algorithms']).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor (30%) */}
        <div className="hidden lg:block w-[30%] bg-gray-800">
          <MonacoCodeEditor
            problemTitle={problem.title}
            problemStatement={problem.description}
            difficulty={problem.difficulty}
            testCases={problem.testCases}
            onSubmissionSuccess={handleSubmissionSuccess}
          />
        </div>
      </div>

      {/* Mobile Code Editor */}
      <div className="lg:hidden">
        <MonacoCodeEditor
          problemTitle={problem.title}
          problemStatement={problem.description}
          difficulty={problem.difficulty}
          testCases={problem.testCases}
          onSubmissionSuccess={handleSubmissionSuccess}
        />
      </div>
    </div>
  );
};

export default PracticeProblemSolving;
