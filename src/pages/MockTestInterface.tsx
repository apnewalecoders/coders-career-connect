
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
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Title and Info */}
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Mock Test #{testId}
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Question {currentQuestion + 1} of {mockQuestions.length} • 
                  Answered: {answeredCount}/{mockQuestions.length}
                </p>
              </div>
              
              {/* Timer and Exit */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                  <Clock className="h-4 w-4 text-red-500" />
                  <span className="font-mono text-lg font-bold text-red-600">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
                      <X className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Exit</span>
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
            </div>
          </div>

          {/* Question Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Question Navigation</h3>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-20 gap-2">
              {mockQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionNavigation(index)}
                  className={`h-10 w-full rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                    getStatusColor(getQuestionStatus(index), currentQuestion === index)
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Seen</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span>Current</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Question Section */}
            <div className="flex-1">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg md:text-xl text-gray-900 leading-relaxed">
                    {mockQuestions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <RadioGroup 
                    value={answers[currentQuestion]?.toString() || ""} 
                    onValueChange={handleAnswerSelect}
                    className="space-y-3"
                  >
                    {mockQuestions[currentQuestion].options.map((option, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start space-x-3 p-3 md:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md active:scale-[0.98] ${
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
                          className="flex-1 cursor-pointer text-gray-700 leading-relaxed text-sm md:text-base"
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

            {/* Progress and Navigation Panel */}
            <div className="lg:w-80">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Completion</span>
                      <span>{Math.round((answeredCount / mockQuestions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(answeredCount / mockQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="flex-1 h-10"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      
                      <Button
                        onClick={handleNext}
                        disabled={currentQuestion === mockQuestions.length - 1}
                        className="flex-1 h-10 bg-blue-600 hover:bg-blue-700"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="w-full h-10 bg-green-600 hover:bg-green-700 text-white"
                          disabled={isSubmitting}
                        >
                          <Flag className="h-4 w-4 mr-2" />
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

                  {/* Statistics */}
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{answeredCount}</div>
                        <div className="text-xs text-gray-500">Answered</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-400">{mockQuestions.length - answeredCount}</div>
                        <div className="text-xs text-gray-500">Remaining</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockTestInterface;
