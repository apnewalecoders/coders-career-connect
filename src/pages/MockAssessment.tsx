import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Building, Target, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockAssessments = [
  {
    id: 1,
    title: "Company-wise Assessment: TCS",
    description: "Test your skills with TCS-specific interview questions",
    duration: 60,
    questions: 20,
    difficulty: "Medium",
    company: "TCS",
    type: "Company Assessment",
    participants: 850
  },
  {
    id: 2,
    title: "Technical Assessment: Data Structures",
    description: "Focus on data structures and algorithms",
    duration: 75,
    questions: 25,
    difficulty: "Hard",
    company: "Google",
    type: "Technical Assessment",
    participants: 1200
  },
  {
    id: 3,
    title: "Role-based Assessment: SDE",
    description: "Assess your skills for a Software Development Engineer role",
    duration: 90,
    questions: 30,
    difficulty: "Hard",
    company: "Amazon",
    type: "Role-based Assessment",
    participants: 980
  },
  {
    id: 4,
    title: "Company-wise Assessment: Wipro",
    description: "Practice with Wipro-specific interview questions",
    duration: 60,
    questions: 20,
    difficulty: "Easy",
    company: "Wipro",
    type: "Company Assessment",
    participants: 620
  },
  {
    id: 5,
    title: "Technical Assessment: System Design",
    description: "Test your knowledge of system design principles",
    duration: 90,
    questions: 25,
    difficulty: "Hard",
    company: "Microsoft",
    type: "Technical Assessment",
    participants: 1100
  },
  {
    id: 6,
    title: "Role-based Assessment: Analyst",
    description: "Assess your skills for an Analyst role",
    duration: 75,
    questions: 25,
    difficulty: "Medium",
    company: "Accenture",
    type: "Role-based Assessment",
    participants: 780
  }
];

const MockAssessment = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");

  const assessmentTypes = ["All", "Company-wise", "Topic-wise", "Role-wise"];
  const companies = ["All", "TCS", "Wipro", "Google", "Accenture", "Amazon", "Microsoft"];

  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesType = selectedType === "All" || 
      (selectedType === "Company-wise" && assessment.type === "Company Assessment") ||
      (selectedType === "Topic-wise" && assessment.type === "Technical Assessment") ||
      (selectedType === "Role-wise" && assessment.type === "Role-based Assessment");
    
    const matchesCompany = selectedCompany === "All" || assessment.company === selectedCompany;
    
    return matchesType && matchesCompany;
  });

  const handleStartAssessment = (assessmentId: number) => {
    navigate(`/mock-assessment/${assessmentId}`);
  };

  const resetFilters = () => {
    setSelectedType("All");
    setSelectedCompany("All");
  };

  const hasActiveFilters = selectedType !== "All" || selectedCompany !== "All";

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
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Mock Assessments</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take comprehensive mock assessments designed to simulate real company hiring processes. Test your skills across different domains and get ready for your dream job.
          </p>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Target className="h-5 w-5 text-brand-red" />
              Filters
            </h3>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-brand-red hover:bg-red-50"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Assessment Type Filter */}
            <div className="flex flex-wrap gap-2">
              {assessmentTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type 
                    ? "bg-brand-red hover:bg-red-600 text-white" 
                    : "hover:bg-gray-50"
                  }
                >
                  {type}
                </Button>
              ))}
            </div>

            {/* Company Filter */}
            <div className="flex flex-wrap gap-2">
              {companies.map((company) => (
                <Button
                  key={company}
                  variant={selectedCompany === company ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCompany(company)}
                  className={selectedCompany === company 
                    ? "bg-brand-red hover:bg-red-600 text-white" 
                    : "hover:bg-gray-50"
                  }
                >
                  <Building className="h-4 w-4 mr-1" />
                  {company}
                </Button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600 mr-2">Active filters:</span>
              {selectedType !== "All" && (
                <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                  {selectedType}
                </Badge>
              )}
              {selectedCompany !== "All" && (
                <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800">
                  {selectedCompany}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">  
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredAssessments.length}</span> assessment{filteredAssessments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Assessments Grid */}
        {filteredAssessments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-brand-red">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 pr-2">
                      {assessment.title}
                    </CardTitle>
                    <Badge className={`text-xs font-medium px-2 py-1 border ${getDifficultyColor(assessment.difficulty)}`}>
                      {assessment.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 line-clamp-2">
                    {assessment.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Assessment Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{assessment.duration} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{assessment.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{assessment.participants}</span>
                    </div>
                  </div>

                  {/* Company Badge */}
                  <div className="flex items-center gap-2">
                    <Badge className="bg-brand-red hover:bg-red-600 text-white text-xs font-medium px-3 py-1">
                      <Building className="h-3 w-3 mr-1" />
                      {assessment.company}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1 border-gray-300">
                      {assessment.type}
                    </Badge>
                  </div>

                  {/* Action Button with Instructions */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-brand-red hover:bg-red-600 text-white font-medium">
                        <Target className="h-4 w-4 mr-2" />
                        Start Assessment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Assessment Instructions</DialogTitle>
                        <DialogDescription className="space-y-3">
                          <div>
                            <strong>Duration:</strong> {assessment.duration} minutes
                          </div>
                          <div>
                            <strong>Questions:</strong> {assessment.questions} questions
                          </div>
                          <div>
                            <strong>Rules:</strong>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                              <li>You cannot go back to previous questions</li>
                              <li>Auto-save enabled</li>
                              <li>Full-screen mode required</li>
                              <li>Time limit strictly enforced</li>
                            </ul>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-3 mt-4">
                        <Button
                          onClick={() => handleStartAssessment(assessment.id)}
                          className="flex-1 bg-brand-red hover:bg-red-600 text-white"
                        >
                          Begin Assessment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Target className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No assessments found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MockAssessment;
