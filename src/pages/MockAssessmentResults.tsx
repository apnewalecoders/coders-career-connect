
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, Share2, ArrowLeft, Target } from "lucide-react";

const MockAssessmentResults = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);

  const { submissions = {}, timeExpired = false } = location.state || {};
  
  // Calculate results
  const totalProblems = 2;
  const solvedProblems = Object.keys(submissions).length;
  const score = solvedProblems;
  const scorePercentage = (score / totalProblems) * 100;

  // Mock detailed results
  const problemResults = [
    {
      id: 1,
      title: "Two Sum Problem",
      solved: submissions[0] || false,
      testCasesPassed: submissions[0] ? 10 : 0,
      totalTestCases: 10,
      timeTaken: submissions[0] ? "12 min 30 sec" : "Not Attempted",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Valid Parentheses",
      solved: submissions[1] || false,
      testCasesPassed: submissions[1] ? 8 : 0,
      totalTestCases: 10,
      timeTaken: submissions[1] ? "15 min 45 sec" : "Not Attempted",
      difficulty: "Easy"
    }
  ];

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleRetakeTest = () => {
    navigate(`/mock-assessment/${assessmentId}/interface`);
  };

  const handleShareResults = () => {
    const shareText = `I just completed a Mock Assessment and scored ${score}/${totalProblems}! 🎯`;
    if (navigator.share) {
      navigator.share({
        title: 'Mock Assessment Results',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.href);
      alert('Results copied to clipboard!');
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100";
    if (percentage >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage === 100) return "Outstanding! Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Performance! 🌟";
    if (percentage >= 60) return "Good Job! Keep Practicing! 👍";
    if (percentage >= 40) return "Not Bad! Room for Improvement! 📈";
    return "Keep Learning and Practicing! 💪";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`transition-all duration-1000 ${showAnimation ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
              <p className="text-lg text-gray-600">
                {timeExpired ? "Time's up! Here are your results." : "Well done! Here's how you performed."}
              </p>
            </div>
          </div>

          {/* Score Overview */}
          <Card className={`mb-8 transition-all duration-1000 delay-300 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-gray-900">Your Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-4xl font-bold ${getScoreBgColor(scorePercentage)} ${getScoreColor(scorePercentage)}`}>
                {score}/{totalProblems}
              </div>
              
              <div>
                <div className={`text-3xl font-bold ${getScoreColor(scorePercentage)} mb-2`}>
                  {scorePercentage.toFixed(0)}%
                </div>
                <p className="text-lg text-gray-700">{getPerformanceMessage(scorePercentage)}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{solvedProblems}</div>
                  <div className="text-sm text-gray-600">Problems Solved</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {problemResults.reduce((acc, p) => acc + p.testCasesPassed, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Test Cases Passed</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">60</div>
                  <div className="text-sm text-gray-600">Minutes Duration</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card className={`mb-8 transition-all duration-1000 delay-500 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Detailed Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {problemResults.map((problem, index) => (
                  <div key={problem.id} className="border rounded-lg p-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${problem.solved ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {problem.solved ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Problem {index + 1}: {problem.title}</h3>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {problem.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${problem.solved ? 'text-green-600' : 'text-red-600'}`}>
                          {problem.testCasesPassed}/{problem.totalTestCases}
                        </div>
                        <div className="text-sm text-gray-600">Test Cases</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Status: </span>
                        <span className={`font-medium ${problem.solved ? 'text-green-600' : 'text-red-600'}`}>
                          {problem.solved ? 'Solved' : 'Not Solved'}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Time Taken: </span>
                        <span className="font-medium text-gray-900">{problem.timeTaken}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-700 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Button
              onClick={handleRetakeTest}
              size="lg"
              className="bg-brand-red hover:bg-red-500 text-white px-8"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Retake Assessment
            </Button>
            
            <Button
              onClick={handleShareResults}
              variant="outline"
              size="lg"
              className="px-8"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Results
            </Button>
            
            <Button
              onClick={() => navigate('/mock-assessment')}
              variant="outline"
              size="lg"
              className="px-8"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Assessments
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockAssessmentResults;
