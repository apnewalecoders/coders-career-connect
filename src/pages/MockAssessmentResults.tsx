
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock, Target, Home, RotateCcw, Share2, CheckCircle, XCircle } from "lucide-react";

const MockAssessmentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  
  const { submissions = {}, timeExpired = false } = location.state || {};
  
  const totalQuestions = 2;
  const submittedCount = Object.values(submissions).filter(Boolean).length;
  const score = submittedCount; // Simplified scoring
  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100" };
    if (percentage >= 60) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (percentage >= 40) return { level: "Average", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const performance = getPerformanceLevel(percentage);

  const handleRetakeAssessment = () => {
    navigate(`/mock-assessment/${assessmentId}/interface`);
  };

  const handleBackToAssessments = () => {
    navigate('/mock-assessment');
  };

  const handleShareResults = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Mock Assessment Results',
        text: `I scored ${score}/${totalQuestions} (${percentage}%) on the Mock Assessment!`,
        url: window.location.href,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {timeExpired ? "Time's Up!" : "Assessment Completed!"}
            </h1>
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
              <div className="text-sm text-gray-500 mt-1">Problems Submitted</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">{percentage}%</div>
              <div className="text-gray-600">Completion Rate</div>
              <div className="text-sm text-gray-500 mt-1">Overall Performance</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {timeExpired ? "60:00" : "45:30"}
              </div>
              <div className="text-gray-600">{timeExpired ? "Time Limit" : "Time Taken"}</div>
              <div className="text-sm text-gray-500 mt-1">Duration</div>
            </CardContent>
          </Card>
        </div>

        {/* Question Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Question-wise Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((questionNum) => (
                <div key={questionNum} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-red text-white rounded-full flex items-center justify-center font-semibold">
                      {questionNum}
                    </div>
                    <div>
                      <div className="font-medium">
                        Question {questionNum}: {questionNum === 1 ? "Two Sum" : "Valid Parentheses"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {questionNum === 1 ? "Array, Hash Table" : "Stack, String"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {submissions[questionNum - 1] ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-green-600 font-medium">Submitted</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-600 font-medium">Not Submitted</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
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
                  <span className="text-gray-700">Completion Rate</span>
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
                {timeExpired && "The assessment was auto-submitted due to time expiry. "}
                {percentage >= 80 && "Outstanding performance! You have a strong grasp of coding concepts."}
                {percentage >= 60 && percentage < 80 && "Good job! With more practice, you can achieve excellence."}
                {percentage >= 40 && percentage < 60 && "You're on the right track. Focus on practicing more coding problems."}
                {percentage < 40 && "Keep practicing! Consider reviewing fundamental algorithms and data structures."}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleRetakeAssessment}
            size="lg"
            className="bg-brand-red hover:bg-red-500 text-white px-8 flex items-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            🔁 Retake Test
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleBackToAssessments}
            className="px-8 flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            🔙 Back to Assessments
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleShareResults}
            className="px-8 flex items-center gap-2"
          >
            <Share2 className="h-5 w-5" />
            📤 Share Result
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MockAssessmentResults;
