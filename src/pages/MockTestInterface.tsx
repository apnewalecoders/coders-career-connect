
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, ChevronLeft, ChevronRight, Flag, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Mock questions data
const mockQuestions = [
  {
    id: 1,
    question: "What is the main principle behind Object-Oriented Programming?",
    options: [
      "Procedural programming approach",
      "Encapsulation, Inheritance, Polymorphism, and Abstraction",
      "Functional programming paradigm", 
      "Structured programming methodology"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which of the following best describes inheritance in OOP?",
    options: [
      "Creating multiple objects of the same class",
      "Hiding implementation details from users",
      "A mechanism where a class acquires properties of another class",
      "Overloading methods with different parameters"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What is polymorphism in Object-Oriented Programming?",
    options: [
      "Having multiple constructors in a class",
      "The ability of objects to take multiple forms",
      "Creating private variables in a class",
      "Inheriting from multiple parent classes"
    ],
    correctAnswer: 1
  },
  // Add more questions to reach 20
  ...Array.from({ length: 17 }, (_, i) => ({
    id: i + 4,
    question: `Sample question ${i + 4} about Object-Oriented Programming concepts?`,
    options: [
      `Option A for question ${i + 4}`,
      `Option B for question ${i + 4}`,
      `Option C for question ${i + 4}`,
      `Option D for question ${i + 4}`
    ],
    correctAnswer: Math.floor(Math.random() * 4)
  }))
];

const MockTestInterface = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [seenQuestions, setSeenQuestions] = useState<Set<number>>(new Set([0]));
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitting]);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (value: string) => {
    const answerIndex = parseInt(value);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleQuestionNavigation = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    setSeenQuestions(prev => new Set([...prev, questionIndex]));
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      setSeenQuestions(prev => new Set([...prev, nextIndex]));
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Calculate score
    let correctAnswers = 0;
    mockQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    // Navigate to results page with score data
    navigate(`/mock-test/${testId}/results`, {
      state: {
        score: correctAnswers,
        totalQuestions: mockQuestions.length,
        timeSpent: (20 * 60) - timeLeft,
        answers
      }
    });
  };

  const handleExit = () => {
    navigate('/mock-test');
  };

  const getQuestionStatus = (index: number) => {
    if (answers.hasOwnProperty(index)) return 'answered';
    if (seenQuestions.has(index)) return 'seen';
    return 'unseen';
  };

  const getStatusColor = (status: string, isCurrent: boolean = false) => {
    if (isCurrent) {
      switch (status) {
        case 'answered': return 'bg-green-600 text-white ring-2 ring-green-400';
        case 'seen': return 'bg-yellow-600 text-white ring-2 ring-yellow-400';
        case 'unseen': return 'bg-blue-600 text-white ring-2 ring-blue-400';
        default: return 'bg-blue-600 text-white ring-2 ring-blue-400';
      }
    }
    
    switch (status) {
      case 'answered': return 'bg-green-500 text-white hover:bg-green-600';
      case 'seen': return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'unseen': return 'bg-gray-300 text-gray-700 hover:bg-gray-400';
      default: return 'bg-gray-300 text-gray-700 hover:bg-gray-400';
    }
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Fixed Header */}
        <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
          <div className="px-4 py-3">
            {/* Top Header Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate">
                  Mock Test #{testId}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Question {currentQuestion + 1} of {mockQuestions.length}
                </p>
              </div>
              
              {/* Timer */}
              <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg mx-4">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="font-mono text-lg font-bold text-red-600">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Exit Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
                    <X className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">Exit</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Exit Test?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to exit? Your progress will be saved but you won't be able to continue this session.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleExit} className="bg-red-600 hover:bg-red-700">
                      Exit Test
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Question Navigation - Horizontally Scrollable */}
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {mockQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`flex-shrink-0 w-10 h-10 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                      getStatusColor(getQuestionStatus(index), currentQuestion === index)
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              {/* Progress Indicators */}
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Answered: {answeredCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Seen: {seenQuestions.size - answeredCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-300 rounded"></div>
                    <span>Unseen: {mockQuestions.length - seenQuestions.size}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl text-gray-900 leading-relaxed">
                {mockQuestions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Options */}
              <RadioGroup 
                value={answers[currentQuestion]?.toString() || ""} 
                onValueChange={handleAnswerSelect}
                className="space-y-4"
              >
                {mockQuestions[currentQuestion].options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md active:scale-[0.98] ${
                      answers[currentQuestion] === index 
                        ? 'border-blue-500 bg-blue-50 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerSelect(index.toString())}
                  >
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`} 
                      className="mt-1 flex-shrink-0"
                    />
                    <label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer text-gray-700 leading-relaxed text-base"
                    >
                      <span className="font-medium text-gray-900 mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Fixed Bottom Navigation */}
        <div className="sticky bottom-0 bg-white border-t shadow-lg">
          <div className="px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Navigation Buttons */}
                <div className="flex gap-3 flex-1">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex-1 sm:flex-none sm:min-w-[120px] h-12 text-base"
                  >
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={currentQuestion === mockQuestions.length - 1}
                    className="flex-1 sm:flex-none sm:min-w-[120px] h-12 text-base bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>

                {/* Submit Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full sm:w-auto sm:min-w-[140px] h-12 text-base bg-green-600 hover:bg-green-700 text-white"
                      disabled={isSubmitting}
                    >
                      <Flag className="h-5 w-5 mr-2" />
                      Submit Test
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Submit Test?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to submit your test? You have answered {answeredCount} out of {mockQuestions.length} questions.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Review Again</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                        Submit Test
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress: {answeredCount}/{mockQuestions.length}</span>
                  <span>{Math.round((answeredCount / mockQuestions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(answeredCount / mockQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Layout>
  );
};

export default MockTestInterface;
