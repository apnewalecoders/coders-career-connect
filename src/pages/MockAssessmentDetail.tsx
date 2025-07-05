
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, FileText, Monitor, Play } from "lucide-react";

const MockAssessmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const assessment = {
    id: parseInt(id || "1"),
    title: "Company-wise Assessment: TCS",
    description: "Test your skills with TCS-specific interview questions focusing on data structures, algorithms, and problem-solving techniques used in technical interviews.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Medium",
    company: "TCS",
    type: "Company-wise",
    topic: "Arrays & Algorithms",
    participants: 850,
    passingScore: 70,
    topics: ["Arrays", "Two Pointers", "Hash Tables", "String Manipulation"],
    problemTitles: ["Two Sum", "Valid Parentheses"],
    instructions: [
      "This is a timed assessment with 2 coding problems",
      "You have 60 minutes to complete both problems",
      "You can switch between problems at any time",
      "Code will be automatically saved as you type",
      "Submit each problem when you're confident in your solution",
      "Full screen mode is required during the assessment"
    ]
  };

  const handleStartAssessment = () => {
    navigate(`/mock-assessment/${id}/fullscreen`);
  };

  const handleStartRegularInterface = () => {
    navigate(`/mock-assessment/${id}/interface`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{assessment.title}</h1>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {assessment.difficulty}
            </Badge>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {assessment.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-gray-600">{assessment.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Problems</div>
                      <div className="text-gray-600">{assessment.problems} coding questions</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Participants</div>
                      <div className="text-gray-600">{assessment.participants.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="font-medium">Company</div>
                      <div className="text-gray-600">{assessment.company}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Problems */}
            <Card>
              <CardHeader>
                <CardTitle>Problems Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessment.problemTitles.map((title, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium">{title}</span>
                      </div>
                      <Badge variant="outline">{assessment.difficulty}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Topics Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {assessment.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {assessment.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Start Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Ready to Start?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleStartAssessment} 
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Full-Screen Assessment
                </Button>
                <Button 
                  onClick={handleStartRegularInterface} 
                  variant="outline"
                  className="w-full h-12 text-lg"
                >
                  <Monitor className="h-5 w-5 mr-2" />
                  Regular Interface
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Full-screen mode provides the best coding experience similar to real technical interviews.
                </p>
              </CardContent>
            </Card>

            {/* Assessment Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{assessment.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passing Score:</span>
                  <span className="font-medium">{assessment.passingScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus Area:</span>
                  <span className="font-medium">{assessment.topic}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockAssessmentDetail;
