
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface MockTestQuestionDisplayProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswerSelect: (value: string) => void;
  isMobile?: boolean;
}

const MockTestQuestionDisplay = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  isMobile = false
}: MockTestQuestionDisplayProps) => {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className={`${isMobile ? 'text-base' : 'text-lg'} leading-relaxed text-gray-900`}>
        {question.question}
      </div>

      <RadioGroup 
        value={selectedAnswer?.toString() || ""} 
        onValueChange={onAnswerSelect}
        className={`space-y-${isMobile ? '3' : '4'}`}
      >
        {question.options.map((option, index) => (
          <div 
            key={index} 
            className={`flex items-start space-x-${isMobile ? '3' : '4'} p-${isMobile ? '3' : '4'} rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
              selectedAnswer === index 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => onAnswerSelect(index.toString())}
          >
            <RadioGroupItem 
              value={index.toString()} 
              id={`${isMobile ? 'mobile-' : ''}option-${index}`} 
              className="mt-1"
            />
            <label 
              htmlFor={`${isMobile ? 'mobile-' : ''}option-${index}`} 
              className={`flex-1 cursor-pointer text-gray-700 leading-relaxed ${isMobile ? 'text-sm' : ''}`}
            >
              {option}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default MockTestQuestionDisplay;
