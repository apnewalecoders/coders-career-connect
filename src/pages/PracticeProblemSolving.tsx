
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { problems, Problem } from "@/data/practiceProblems";
import PracticeProblemHeader from "@/components/practiceProblems/PracticeProblemHeader";
import ProblemNotFound from "@/components/practiceProblems/ProblemNotFound";
import CodeCompiler from "@/components/compiler/CodeCompiler";

const PracticeProblemSolving = () => {
  const { problemId } = useParams<{ problemId: string }>();
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const foundProblem = problems.find(p => p.id === parseInt(problemId || "1"));
    setProblem(foundProblem || null);
  }, [problemId]);

  const handleSubmissionSuccess = () => {
    setIsSolved(true);
    // In a real app, you would save the solved status to backend/localStorage
    localStorage.setItem(`problem_${problemId}_solved`, 'true');
  };

  if (!problem) {
    return <ProblemNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PracticeProblemHeader problem={problem} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)]">
        <CodeCompiler
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
