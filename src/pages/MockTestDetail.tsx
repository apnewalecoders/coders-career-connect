
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, Users, Award, CheckCircle, ArrowRight } from "lucide-react";

const mockTestData = {
  1: {
    id: 1,
    title: "Object-Oriented Programming",
    description: "Test your knowledge of OOP concepts, inheritance, polymorphism, and design patterns.",
    questions: 20,
    duration: "20 mins",
    difficulty: "Medium",
    category: "Programming Concepts",
    about: "This comprehensive test covers fundamental Object-Oriented Programming concepts that are essential for software development. You'll encounter questions about classes, objects, inheritance, polymorphism, encapsulation, and abstraction.",
    benefits: [
      "Assess your understanding of core OOP principles",
      "Identify knowledge gaps in object-oriented design",
      "Prepare for technical interviews",
      "Build confidence in programming concepts"
    ],
    topics: [
      "Classes and Objects",
      "Inheritance and Polymorphism", 
      "Encapsulation and Abstraction",
      "Design Patterns",
      "Method Overriding and Overloading",
      "Interface and Abstract Classes"
    ],
    icon: <FileText className="h-8 w-8 text-blue-500" />
  },
  2: {
    id: 2,
    title: "Data Structures & Algorithms",
    description: "Comprehensive test covering arrays, linked lists, trees, graphs, and sorting algorithms.",
    questions: 20,
    duration: "20 mins", 
    difficulty: "Hard",
    category: "Computer Science",
    about: "Challenge yourself with complex data structure and algorithm questions. This test evaluates your problem-solving skills and understanding of efficient data organization and manipulation techniques.",
    benefits: [
      "Master fundamental data structures",
      "Improve algorithmic thinking",
      "Enhance problem-solving skills",
      "Excel in coding interviews"
    ],
    topics: [
      "Arrays and Strings",
      "Linked Lists",
      "Stacks and Queues",
      "Trees and Binary Search Trees",
      "Graphs and Graph Algorithms",
      "Sorting and Searching Algorithms"
    ],
    icon: <Award className="h-8 w-8 text-green-500" />
  }
};

const relatedTests = [
  { id: 3, title: "Computer Networks", difficulty: "Medium" },
  { id: 4, title: "Operating Systems", difficulty: "Medium" }, 
  { id: 5, title: "Database Management", difficulty: "Easy" },
  { id: 6, title: "Software Engineering", difficulty: "Easy" }
];

const MockTestDetail = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const testIdNumber = parseInt(testId || '0', 10);
  const test = mockTestData[testIdNumber as keyof typeof mockTestData];
  
  if (!test) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
          <Button onClick={() => navigate('/mock-test')}>Back to Mock Tests</Button>
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

  const handleStartTest = () => {
    navigate(`/mock-test/${testId}/instructions`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Related Tests Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tests</h3>
            <div className="space-y-3">
              {relatedTests.map((relatedTest) => (
                <Card key={relatedTest.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm text-gray-900 mb-2">{relatedTest.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(relatedTest.difficulty)}`}>
                      {relatedTest.difficulty}
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
                {test.icon}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{test.title}</h1>
                  <p className="text-gray-600">{test.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(test.difficulty)}`}>
                  {test.difficulty}
                </span>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{test.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{test.questions} Questions</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>About This Test</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{test.about}</p>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {test.benefits.map((benefit, index) => (
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
                  {test.topics.map((topic, index) => (
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
                onClick={handleStartTest}
                size="lg"
                className="bg-brand-red hover:bg-red-500 text-white px-8"
              >
                Start Test
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/mock-test')}
              >
                Back to Tests
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockTestDetail;
