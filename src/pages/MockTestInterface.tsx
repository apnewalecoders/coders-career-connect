
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react";

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

  const getQuestionStatus = (index: number) => {
    if (answers.hasOwnProperty(index)) return 'answered';
    if (seenQuestions.has(index)) return 'seen';
    return 'unseen';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'bg-green-500 text-white';
      case 'seen': return 'bg-yellow-500 text-white';
      case 'unseen': return 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const answeredCount = Object.keys(answers).length;
  const seenCount = seenQuestions.size - answeredCount;
  const unseenCount = mockQuestions.length - seenQuestions.size;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-screen">
          {/* Left Sidebar - Question Navigation */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {mockQuestions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionNavigation(index)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                        getStatusColor(getQuestionStatus(index))
                      } ${currentQuestion === index ? 'ring-2 ring-brand-red' : ''}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Answered: {answeredCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Seen: {seenCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span>Unseen: {unseenCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center - Question Display */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Question {currentQuestion + 1} of {mockQuestions.length}</CardTitle>
                  <div className="flex items-center gap-2 text-brand-red font-semibold">
                    <Clock className="h-5 w-5" />
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg font-medium text-gray-900 leading-relaxed">
                  {mockQuestions[currentQuestion].question}
                </div>
                
                <RadioGroup 
                  value={answers[currentQuestion]?.toString() || ""} 
                  onValueChange={handleAnswerSelect}
                  className="space-y-4"
                >
                  {mockQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={currentQuestion === mockQuestions.length - 1}
                    className="flex items-center gap-2 bg-brand-red hover:bg-red-500"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Test Info */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Test Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Clock className="h-8 w-8 text-brand-red mx-auto mb-2" />
                  <div className="text-2xl font-bold text-brand-red">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-gray-600">Time Remaining</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-semibold">{mockQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Answered:</span>
                    <span className="font-semibold text-green-600">{answeredCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-semibold text-red-600">{mockQuestions.length - answeredCount}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-brand-red hover:bg-red-500 text-white flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  <Flag className="h-4 w-4" />
                  Submit Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockTestInterface;
