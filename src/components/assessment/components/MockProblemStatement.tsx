
import { Badge } from "@/components/ui/badge";
import { Building2, Tag } from "lucide-react";

interface Problem {
  id: number;
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string;
  difficulty: string;
  companies?: string[];
  topics?: string[];
  testCases?: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

interface MockProblemStatementProps {
  problem: Problem;
  currentQuestionIndex: number;
  isSubmitted: boolean;
}

const MockProblemStatement = ({ problem, currentQuestionIndex, isSubmitted }: MockProblemStatementProps) => {
  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Problem Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentQuestionIndex + 1}. {problem.title}
              </h2>
              <Badge className={`${
                problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {problem.difficulty}
              </Badge>
            </div>
            {isSubmitted && (
              <Badge className="bg-blue-100 text-blue-700">
                Submitted ✓
              </Badge>
            )}
          </div>
        </div>

        {/* Problem Description */}
        <div>
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
              {problem.description}
            </div>
          </div>
        </div>

        {/* Examples */}
        {problem.examples && problem.examples.length > 0 && (
          <div className="space-y-4">
            {problem.examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm">Example {index + 1}:</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700 text-sm">Input:</span>
                      <pre className="mt-1 text-xs text-gray-800 font-mono bg-white p-2 rounded border overflow-x-auto">
                        {example.input}
                      </pre>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 text-sm">Output:</span>
                      <pre className="mt-1 text-xs text-gray-800 font-mono bg-white p-2 rounded border overflow-x-auto">
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
        {problem.constraints && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Constraints:</h3>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                {problem.constraints}
              </pre>
            </div>
          </div>
        )}

        {/* Tags and Companies */}
        <div className="pt-4 border-t border-gray-200 space-y-4">
          {/* Companies */}
          <div className="flex items-start gap-2">
            <Building2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <span className="text-sm font-medium text-gray-700">Asked by:</span>
              <div className="flex gap-2 flex-wrap">
                {(problem.companies || ['Google', 'Microsoft', 'Amazon', 'Meta']).map((company) => (
                  <Badge key={company} variant="outline" className="text-xs px-2 py-1">
                    {company}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="flex items-start gap-2">
            <Tag className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <span className="text-sm font-medium text-gray-700">Topics:</span>
              <div className="flex gap-2 flex-wrap">
                {(problem.topics || ['Array', 'Algorithms', 'Data Structures']).map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs px-2 py-1 bg-blue-50 text-blue-700">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockProblemStatement;
