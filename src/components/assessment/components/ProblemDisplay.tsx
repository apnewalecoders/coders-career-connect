
import { Badge } from "@/components/ui/badge";

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  testCases: TestCase[];
}

interface ProblemDisplayProps {
  problem: Problem;
}

const ProblemDisplay = ({ problem }: ProblemDisplayProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-6 max-w-4xl">
        {/* Problem Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
            <Badge className={`${getDifficultyColor(problem.difficulty)} border`}>
              {problem.difficulty}
            </Badge>
          </div>
        </div>

        {/* Problem Description */}
        <div className="prose max-w-none mb-8">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
            {problem.description}
          </div>
        </div>

        {/* Sample Test Cases */}
        {problem.testCases && problem.testCases.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Examples
            </h3>
            {problem.testCases.slice(0, 2).map((testCase, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="font-semibold text-gray-900 mb-3">Example {index + 1}:</h4>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-gray-700 mb-1">Input:</div>
                    <pre className="bg-white p-3 rounded border text-sm font-mono text-gray-800 overflow-x-auto">
{testCase.input}
                    </pre>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 mb-1">Output:</div>
                    <pre className="bg-white p-3 rounded border text-sm font-mono text-gray-800 overflow-x-auto">
{testCase.expectedOutput}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDisplay;
