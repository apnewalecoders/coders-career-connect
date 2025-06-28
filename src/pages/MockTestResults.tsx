
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock, Target, Home, RotateCcw, Share2 } from "lucide-react";

const MockTestResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { testId } = useParams();
  
  const { score, totalQuestions, timeSpent, answers } = location.state || {
    score: 0,
    totalQuestions: 20,
    timeSpent: 0,
    answers: {}
  };

  const percentage = Math.round((score / totalQuestions) * 100);
  const timeSpentMinutes = Math.floor(timeSpent / 60);
  const timeSpentSeconds = timeSpent % 60;

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100" };
    if (percentage >= 60) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (percentage >= 40) return { level: "Average", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const performance = getPerformanceLevel(percentage);

  const handleRetakeTest = () => {
    navigate(`/mock-test/${testId}/instructions`);
  };

  const handleBackToHome = () => {
    navigate('/mock-test');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Test Completed!</h1>
            <p className="text-lg text-gray-600">Here's how you performed</p>
          </div>
          
          <div className={`inline-block px-6 py-3 rounded-full ${performance.bgColor} ${performance.color} font-semibold text-lg`}>
            {performance.level}
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center border-2 border-brand-red">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-brand-red mb-2">{score}</div>
              <div className="text-gray-600">out of {totalQuestions}</div>
              <div className="text-sm text-gray-500 mt-1">Correct Answers</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">{percentage}%</div>
              <div className="text-gray-600">Score Percentage</div>
              <div className="text-sm text-gray-500 mt-1">Overall Performance</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {timeSpentMinutes}:{timeSpentSeconds.toString().padStart(2, '0')}
              </div>
              <div className="text-gray-600">Time Taken</div>
              <div className="text-sm text-gray-500 mt-1">Total Duration</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Detailed Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{totalQuestions - score}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{Object.keys(answers).length}</div>
                <div className="text-sm text-gray-600">Attempted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 mb-1">{totalQuestions - Object.keys(answers).length}</div>
                <div className="text-sm text-gray-600">Skipped</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Accuracy Rate</span>
                  <span className="font-semibold">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-red h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-4 text-sm text-gray-600">
                {percentage >= 80 && "Outstanding performance! You have a strong grasp of the concepts."}
                {percentage >= 60 && percentage < 80 && "Good job! With a bit more practice, you can achieve excellence."}
                {percentage >= 40 && percentage < 60 && "You're on the right track. Focus on reviewing the topics you missed."}
                {percentage < 40 && "Keep practicing! Consider reviewing the fundamental concepts before retaking the test."}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleRetakeTest}
            size="lg"
            className="bg-brand-red hover:bg-red-500 text-white px-8 flex items-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            Retake Test
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleBackToHome}
            className="px-8 flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            Back to Tests
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 flex items-center gap-2"
          >
            <Share2 className="h-5 w-5" />
            Share Results
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MockTestResults;
