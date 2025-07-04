
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { problems, Problem } from "@/data/practiceProblems";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { X, ArrowLeft, ExternalLink } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ProblemStatement from "@/components/practiceProblems/ProblemStatement";
import CodeEditorSection from "@/components/practiceProblems/CodeEditorSection";

const PracticeProblemSolving = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const foundProblem = problems.find(p => p.id === parseInt(problemId || "1"));
    setProblem(foundProblem || null);
    
    // Check if problem is already solved
    if (foundProblem) {
      const solved = localStorage.getItem(`problem_${problemId}_solved`) === 'true';
      setIsSolved(solved);
    }
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

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
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
            <Badge 
              className={`${
                problem.difficulty.toLowerCase() === 'easy' ? 'bg-green-100 text-green-800' :
                problem.difficulty.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {problem.difficulty}
            </Badge>
            {isSolved && (
              <Badge className="bg-green-100 text-green-800">Solved ✓</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Leave Problem?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to leave? Your progress will be saved.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleExit}>Leave</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Main Content - Resizable Split Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Problem Statement */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ProblemStatement problem={problem} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Panel - Code Editor */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <CodeEditorSection
              problem={problem}
              isSolved={isSolved}
              onSubmissionSuccess={handleSubmissionSuccess}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default PracticeProblemSolving;
