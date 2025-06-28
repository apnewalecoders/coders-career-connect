
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Code, Building, Users, Award, CheckCircle, ArrowRight, Timer } from "lucide-react";

const mockAssessmentData = {
  1: {
    id: 1,
    title: "Full Stack Developer Assessment",
    description: "Complete assessment covering frontend, backend, and database concepts with coding problems.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Medium",
    category: "General Assessment",
    about: "This comprehensive coding assessment evaluates your full-stack development skills through practical programming challenges. You'll solve real-world problems that test your ability to implement algorithms, work with data structures, and write clean, efficient code.",
    benefits: [
      "Test your problem-solving abilities",
      "Practice coding under time pressure",
      "Evaluate algorithmic thinking skills",
      "Prepare for technical interviews"
    ],
    topics: [
      "Data Structures and Algorithms",
      "Problem Solving Techniques",
      "Code Optimization",
      "Time and Space Complexity",
      "Implementation Skills",
      "Debugging and Testing"
    ],
    icon: <Code className="h-8 w-8 text-blue-500" />
  },
  2: {
    id: 2,
    title: "Data Structures Assessment",
    description: "Advanced coding problems focusing on complex data structures and algorithms.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Hard",
    category: "Technical Assessment",
    about: "Challenge yourself with advanced data structure and algorithm problems. This assessment focuses on complex problem-solving scenarios that require deep understanding of efficient data organization and manipulation techniques.",
    benefits: [
      "Master advanced data structures",
      "Improve algorithmic complexity analysis",
      "Enhance coding interview preparation",
      "Build confidence in problem solving"
    ],
    topics: [
      "Advanced Trees and Graphs",
      "Dynamic Programming",
      "Complex Algorithm Design",
      "Optimization Techniques",
      "Advanced Data Manipulation",
      "System Design Concepts"
    ],
    icon: <Code className="h-8 w-8 text-green-500" />
  },
  4: {
    id: 4,
    title: "TCS CodeVita Assessment",
    company: "TCS",
    description: "Practice TCS-style coding problems and algorithmic challenges.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Medium",
    category: "Company Assessment",
    about: "Simulate the TCS CodeVita coding competition experience with carefully crafted problems that mirror the actual assessment format. Perfect preparation for TCS technical interviews and coding competitions.",
    benefits: [
      "Experience TCS-style problems",
      "Understand TCS assessment format",
      "Practice competitive programming",
      "Improve coding speed and accuracy"
    ],
    topics: [
      "Mathematical Problem Solving",
      "String Manipulation",
      "Array and Matrix Operations",
      "Graph Theory Applications",
      "Greedy Algorithms",
      "Implementation Challenges"
    ],
    icon: <Building className="h-8 w-8 text-blue-600" />
  }
};

const relatedAssessments = [
  { id: 5, title: "Wipro NLTH Assessment", difficulty: "Medium", company: "Wipro" },
  { id: 6, title: "Google SDE Assessment", difficulty: "Hard", company: "Google" },
  { id: 7, title: "Accenture Coding Test", difficulty: "Easy", company: "Accenture" },
  { id: 3, title: "System Design Assessment", difficulty: "Hard", category: "Technical" }
];

const MockAssessmentDetail = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  
  const assessmentIdNumber = parseInt(assessmentId || '0', 10);
  const assessment = mockAssessmentData[assessmentIdNumber as keyof typeof mockAssessmentData];
  
  if (!assessment) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Assessment Not Found</h1>
          <Button onClick={() => navigate('/mock-assessment')}>Back to Mock Assessments</Button>
        </div>
      </Layout>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const handleStartAssessment = () => {
    navigate(`/mock-assessment/${assessmentId}/interface`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Related Assessments Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Assessments</h3>
            <div className="space-y-3">
              {relatedAssessments.map((relatedAssessment) => (
                <Card key={relatedAssessment.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm text-gray-900 mb-2">{relatedAssessment.title}</h4>
                    {'company' in relatedAssessment && (
                      <div className="text-xs text-brand-red font-medium mb-1">{relatedAssessment.company}</div>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(relatedAssessment.difficulty)}`}>
                      {relatedAssessment.difficulty}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                {assessment.icon}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{assessment.title}</h1>
                  <p className="text-gray-600">{assessment.category}</p>
                  {'company' in assessment && (
                    <p className="text-brand-red font-medium">{assessment.company}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                  {assessment.difficulty}
                </span>
                <div className="flex items-center gap-1 text-gray-600">
                  <Timer className="h-4 w-4" />
                  <span>{assessment.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Code className="h-4 w-4" />
                  <span>{assessment.problems} Coding Problems</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>About This Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{assessment.about}</p>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {assessment.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Topics Covered */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Topics Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {assessment.topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-brand-red" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleStartAssessment}
                size="lg"
                className="bg-brand-red hover:bg-red-500 text-white px-8"
              >
                Start Assessment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/mock-assessment')}
              >
                Back to Assessments
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockAssessmentDetail;
