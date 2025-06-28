
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, Users, Award } from "lucide-react";

const mockTests = [
  {
    id: 1,
    title: "Object-Oriented Programming",
    description: "Test your knowledge of OOP concepts, inheritance, polymorphism, and design patterns.",
    questions: 20,
    duration: "20 mins",
    difficulty: "Medium",
    icon: <FileText className="h-8 w-8 text-blue-500" />
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    description: "Comprehensive test covering arrays, linked lists, trees, graphs, and sorting algorithms.",
    questions: 20,
    duration: "20 mins",
    difficulty: "Hard",
    icon: <Award className="h-8 w-8 text-green-500" />
  },
  {
    id: 3,
    title: "Computer Networks",
    description: "Test your understanding of networking protocols, OSI model, and network security.",
    questions: 20,
    duration: "20 mins",
    difficulty: "Medium",
    icon: <Users className="h-8 w-8 text-purple-500" />
  },
  {
    id: 4,
    title: "Operating Systems",
    description: "Cover process management, memory management, file systems, and synchronization.",
    questions: 20,
    duration: "20 mins",
    difficulty: "Medium",
    icon: <Clock className="h-8 w-8 text-orange-500" />
  },
  {
    id: 5,
    title: "Database Management",
    description: "Test your knowledge of SQL, database design, normalization, and transactions.",
    questions: 20,
    duration: "20 mins",
    difficulty: "Easy",
    icon: <FileText className="h-8 w-8 text-red-500" />
  },
  {
    id: 6,
    title: "Software Engineering",
    description: "Comprehensive test on SDLC, testing methodologies, and project management.",
    questions: 20,
    duration: "20 mins",
    difficulty: "Easy",
    icon: <Award className="h-8 w-8 text-indigo-500" />
  }
];

const MockTest = () => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const handleStartTest = (testId: number) => {
    navigate(`/mock-test/${testId}/instructions`);
  };

  const handleViewDetails = (testId: number) => {
    navigate(`/mock-test/${testId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mock Tests</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with our comprehensive mock tests. Each test contains 20 carefully crafted questions to help you prepare for interviews and assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  {test.icon}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{test.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {test.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{test.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{test.duration}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => handleStartTest(test.id)}
                    className="flex-1 bg-brand-red hover:bg-red-500 text-white"
                  >
                    Start Test
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewDetails(test.id)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MockTest;
