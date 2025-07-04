
interface QuestionNavigationProps {
  currentQuestion: number;
  questionStatus: { [key: number]: 'unattempted' | 'attempted' | 'submitted' };
  totalQuestions: number;
  onQuestionSwitch: (questionIndex: number) => void;
}

const QuestionNavigation = ({ 
  currentQuestion, 
  questionStatus, 
  totalQuestions, 
  onQuestionSwitch 
}: QuestionNavigationProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-500 hover:bg-green-600';
      case 'attempted': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-gray-300 hover:bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return '✓';
      case 'attempted': return '◐';
      default: return '○';
    }
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex-shrink-0">
      <div className="flex justify-center gap-2 max-w-7xl mx-auto">
        {Array.from({ length: totalQuestions }, (_, index) => (
          <button
            key={index}
            onClick={() => onQuestionSwitch(index)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              index === currentQuestion
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold ${
              index === currentQuestion 
                ? 'bg-white text-blue-600' 
                : `text-white ${getStatusColor(questionStatus[index])}`
            }`}>
              {getStatusIcon(questionStatus[index])}
            </span>
            Question {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;
