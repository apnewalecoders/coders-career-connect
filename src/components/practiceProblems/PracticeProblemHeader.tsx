
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Problem } from "@/data/practiceProblems";

interface PracticeProblemHeaderProps {
  problem: Problem;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-green-100 text-green-800";
    case "Medium": return "bg-yellow-100 text-yellow-800";
    case "Hard": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const PracticeProblemHeader = ({ problem }: PracticeProblemHeaderProps) => {
  const navigate = useNavigate();

  return (
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
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getDifficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
            <div className="text-sm text-gray-600">
              Asked by <span className="font-semibold">{problem.askedBy}</span>
            </div>
            <div className="flex gap-2">
              {problem.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PracticeProblemHeader;
