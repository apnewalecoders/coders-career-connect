
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Problem {
  id: number;
  title: string;
  statement: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  difficulty: string;
}

interface MockProblemDisplayProps {
  problem: Problem;
  currentQuestionIndex: number;
  isSubmitted: boolean;
}

const MockProblemDisplay = ({ problem, currentQuestionIndex, isSubmitted }: MockProblemDisplayProps) => {
  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-900">
              Question {currentQuestionIndex + 1}: {problem.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                {problem.difficulty}
              </span>
              {isSubmitted && (
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                  Submitted
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Problem Statement</h3>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {problem.statement}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Constraints</h3>
                <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                  {problem.constraints}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Example</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-700 whitespace-pre-line mb-2">
                    {problem.sampleInput}
                  </div>
                  <div className="text-gray-700 whitespace-pre-line">
                    {problem.sampleOutput}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockProblemDisplay;
