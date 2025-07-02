
import MonacoCodeEditor from "./MonacoCodeEditor";

interface TestCase {
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

interface CompilerProps {
  problemTitle: string;
  problemStatement: string;
  difficulty: string;
  testCases: TestCase[];
  onSubmissionSuccess?: () => void;
  isFullScreen?: boolean;
  showTimer?: boolean;
  timeLeft?: number;
}

const CodeCompiler = (props: CompilerProps) => {
  return <MonacoCodeEditor {...props} />;
};

export default CodeCompiler;
