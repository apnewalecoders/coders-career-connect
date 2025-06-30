
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookOpen, Target } from "lucide-react";
import MockTestFilters from "@/components/mockTest/MockTestFilters";

const mockTests = [
  {
    id: 1,
    title: "TCS Digital Coding Test",
    description: "Practice coding questions similar to TCS Digital hiring process",
    duration: 90,
    questions: 20,
    difficulty: "Medium",
    topic: "DSA",
    company: "TCS",
    participants: 1250,
    tags: ["Arrays", "Strings", "Basic Programming"]
  },
  {
    id: 2,
    title: "Google Technical Assessment",
    description: "Advanced algorithmic problems focusing on data structures and algorithms",
    duration: 120,
    questions: 15,
    difficulty: "Hard",
    topic: "DSA",
    company: "Google",
    participants: 890,
    tags: ["Dynamic Programming", "Graphs", "Trees"]
  },
  {
    id: 3,
    title: "Amazon SDE Mock Test",
    description: "Comprehensive test covering coding and system design concepts",
    duration: 105,
    questions: 18,
    difficulty: "Hard",
    topic: "System Design",
    company: "Amazon",
    participants: 1100,
    tags: ["Algorithms", "System Design", "OOPs"]
  },
  {
    id: 4,
    title: "Microsoft Coding Challenge",
    description: "Test your programming skills with Microsoft-style questions",
    duration: 75,
    questions: 12,
    difficulty: "Medium",
    topic: "OOPs",
    company: "Microsoft",
    participants: 750,
    tags: ["Object Oriented Programming", "Data Structures"]
  },
  {
    id: 5,
    title: "Database Management Quiz",
    description: "Test your knowledge of database concepts and SQL queries",
    duration: 60,
    questions: 25,
    difficulty: "Easy",
    topic: "DBMS",
    company: "Wipro",
    participants: 650,
    tags: ["SQL", "Database Design", "Normalization"]
  },
  {
    id: 6,
    title: "Operating System Fundamentals",
    description: "Comprehensive test on OS concepts, processes, and memory management",
    duration: 80,
    questions: 30,
    difficulty: "Medium",
    topic: "OS",
    company: "Infosys",
    participants: 920,
    tags: ["Process Management", "Memory", "File Systems"]
  }
];

const MockTest = () => {
  const navigate = useNavigate();
  const [filteredTests, setFilteredTests] = useState(mockTests);

  const handleFiltersChange = (filters: { difficulty: string; topic: string; company: string }) => {
    const filtered = mockTests.filter(test => {
      const matchesDifficulty = filters.difficulty === "All" || test.difficulty === filters.difficulty;
      const matchesTopic = filters.topic === "All" || test.topic === filters.topic;
      const matchesCompany = filters.company === "All" || test.company === filters.company;
      
      return matchesDifficulty && matchesTopic && matchesCompany;
    });
    
    setFilteredTests(filtered);
  };

  const handleStartTest = (testId: number) => {
    navigate(`/mock-test/${testId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Mock Tests</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Test your knowledge and skills with our comprehensive mock tests. Practice with real interview questions from top companies and improve your performance.
          </p>
        </div>

        {/* Filters */}
        <MockTestFilters onFiltersChange={handleFiltersChange} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredTests.length}</span> mock test{filteredTests.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-brand-red">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 pr-2">
                      {test.title}
                    </CardTitle>
                    <Badge className={`text-xs font-medium px-2 py-1 border ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 line-clamp-2">
                    {test.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Test Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{test.duration} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{test.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{test.participants}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {test.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-2 py-1 border-gray-300">
                        {tag}
                      </Badge>
                    ))}
                    {test.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-1 border-gray-300">
                        +{test.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleStartTest(test.id)}
                    className="w-full bg-brand-red hover:bg-red-600 text-white font-medium"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Start Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tests found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MockTest;
