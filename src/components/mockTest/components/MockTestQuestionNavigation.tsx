
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface MockTestQuestionNavigationProps {
  questions: Question[];
  currentQuestion: number;
  answers: { [key: number]: number };
  seenQuestions: Set<number>;
  onQuestionNavigation: (questionIndex: number) => void;
}

const MockTestQuestionNavigation = ({
  questions,
  currentQuestion,
  answers,
  seenQuestions,
  onQuestionNavigation
}: MockTestQuestionNavigationProps) => {
  const getQuestionStatus = (index: number) => {
    if (answers.hasOwnProperty(index)) return 'answered';
    if (seenQuestions.has(index)) return 'seen';
    return 'unseen';
  };

  const getStatusColor = (status: string, isCurrent: boolean = false) => {
    if (isCurrent) {
      return 'bg-orange-500 text-white ring-2 ring-orange-300';
    }
    
    switch (status) {
      case 'answered': return 'bg-green-500 text-white hover:bg-green-600';
      case 'seen': return 'bg-orange-500 text-white hover:bg-orange-600';
      case 'unseen': return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
      default: return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-4 lg:grid-cols-4 gap-2">
      {questions.map((_, index) => (
        <button
          key={index}
          onClick={() => onQuestionNavigation(index)}
          className={`h-10 lg:h-12 lg:w-12 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
            getStatusColor(getQuestionStatus(index), currentQuestion === index)
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default MockTestQuestionNavigation;
