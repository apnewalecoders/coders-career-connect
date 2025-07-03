
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react";
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

  const answeredCount = Object.keys(answers).length;
  const remainingCount = mockQuestions.length - answeredCount;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-4">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-lg font-bold text-gray-900">Mock Test #{testId}</h1>
                <div className="flex items-center gap-2 text-red-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </p>
            </div>

            {/* Mobile Question Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {mockQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`h-10 rounded-lg font-medium text-sm transition-all ${
                      getStatusColor(getQuestionStatus(index), currentQuestion === index)
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Question */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-base">
                  {mockQuestions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={answers[currentQuestion]?.toString() || ""} 
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {mockQuestions[currentQuestion].options.map((option, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        answers[currentQuestion] === index 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleAnswerSelect(index.toString())}
                    >
                      <RadioGroupItem 
                        value={index.toString()} 
                        id={`mobile-option-${index}`} 
                        className="mt-1"
                      />
                      <label 
                        htmlFor={`mobile-option-${index}`} 
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Mobile Navigation */}
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={currentQuestion === mockQuestions.length - 1}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Mobile Submit */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  <Flag className="h-4 w-4 mr-2" />
                  Submit Test
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit Test?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have answered {answeredCount} out of {mockQuestions.length} questions.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit} className="bg-red-500 hover:bg-red-600">
                    Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-6">
            {/* Left Panel - Questions Navigation */}
            <div className="w-80">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {mockQuestions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionNavigation(index)}
                        className={`h-12 w-12 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                          getStatusColor(getQuestionStatus(index), currentQuestion === index)
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Answered: {answeredCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span>Seen: {seenQuestions.size - answeredCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded"></div>
                      <span>Unseen: {mockQuestions.length - seenQuestions.size}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center Panel - Question */}
            <div className="flex-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">
                    Question {currentQuestion + 1} of {mockQuestions.length}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-red-600">
                    <Clock className="h-5 w-5" />
                    <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-lg leading-relaxed text-gray-900">
                    {mockQuestions[currentQuestion].question}
                  </div>

                  <RadioGroup 
                    value={answers[currentQuestion]?.toString() || ""} 
                    onValueChange={handleAnswerSelect}
                    className="space-y-4"
                  >
                    {mockQuestions[currentQuestion].options.map((option, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                          answers[currentQuestion] === index 
                            ? 'border-blue-500 bg-blue-50 shadow-sm' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => handleAnswerSelect(index.toString())}
                      >
                        <RadioGroupItem 
                          value={index.toString()} 
                          id={`option-${index}`} 
                          className="mt-1"
                        />
                        <label 
                          htmlFor={`option-${index}`} 
                          className="flex-1 cursor-pointer text-gray-700 leading-relaxed"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="px-6"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      disabled={currentQuestion === mockQuestions.length - 1}
                      className="px-6 bg-red-500 hover:bg-red-600"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Test Summary */}
            <div className="w-80">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Test Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Timer Display */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="text-3xl font-bold text-red-600 font-mono">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-sm text-gray-500">Time Remaining</div>
                  </div>

                  {/* Statistics */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Questions:</span>
                      <span className="font-bold">{mockQuestions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Answered:</span>
                      <span className="font-bold text-green-600">{answeredCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-bold text-red-600">{remainingCount}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full bg-red-500 hover:bg-red-600 text-white h-12">
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
                        <AlertDialogAction onClick={handleSubmit} className="bg-red-500 hover:bg-red-600">
                          Submit Test
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
