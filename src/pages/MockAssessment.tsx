
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Building, Target, BookOpen } from "lucide-react";
import AssessmentFilters from "@/components/assessment/AssessmentFilters";
import AssessmentInstructions from "@/components/assessment/AssessmentInstructions";

const mockAssessments = [
  {
    id: 1,
    title: "Company-wise Assessment: TCS",
    description: "Test your skills with TCS-specific interview questions",
    duration: "60 mins",
    problems: 2,
    difficulty: "Medium",
    company: "TCS",
    type: "Company-wise",
    topic: "Arrays",
    participants: 850
  },
  {
    id: 2,
    title: "Technical Assessment: Data Structures",
    description: "Focus on data structures and algorithms",
    duration: "75 mins",
    problems: 3,
    difficulty: "Hard",
    company: "Google",
    type: "Random",
    topic: "Trees",
    participants: 1200
  },
  {
    id: 3,
    title: "Role-based Assessment: SDE",
    description: "Assess your skills for a Software Development Engineer role",
    duration: "90 mins",
    problems: 4,
    difficulty: "Hard",
    company: "Amazon",
    type: "Company-wise",
    topic: "Dynamic Programming",
    participants: 980
  },
  {
    id: 4,
    title: "Company-wise Assessment: Wipro",
    description: "Practice with Wipro-specific interview questions",
    duration: "60 mins",
    problems: 2,
    difficulty: "Easy",
    company: "Wipro",
    type: "Company-wise",
    topic: "Strings",
    participants: 620
  },
  {
    id: 5,
    title: "Technical Assessment: System Design",
    description: "Test your knowledge of system design principles",
    duration: "90 mins",
    problems: 3,
    difficulty: "Hard",
    company: "Microsoft",
    type: "Random",
    topic: "System Design",
    participants: 1100
  },
  {
    id: 6,
    title: "Role-based Assessment: Analyst",
    description: "Assess your skills for an Analyst role",
    duration: "75 mins",
    problems: 3,
    difficulty: "Medium",
    company: "Accenture",
    type: "Company-wise",
    topic: "Graphs",
    participants: 780
  }
];

const MockAssessment = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: "All",
    company: "All",
    topic: "All",
    difficulty: "All"
  });

  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesType = filters.type === "All" || assessment.type === filters.type;
    const matchesCompany = filters.company === "All" || assessment.company === filters.company;
    const matchesTopic = filters.topic === "All" || assessment.topic === filters.topic;
    const matchesDifficulty = filters.difficulty === "All" || assessment.difficulty === filters.difficulty;
    
    return matchesType && matchesCompany && matchesTopic && matchesDifficulty;
  });

  const handleStartAssessment = (assessmentId: number) => {
    navigate(`/mock-assessment/${assessmentId}/interface`);
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
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Mock Assessments</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take comprehensive mock assessments designed to simulate real company hiring processes. Test your skills across different domains and get ready for your dream job.
          </p>
        </div>

        {/* Filters */}
        <AssessmentFilters onFiltersChange={setFilters} />

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
                      <span>{assessment.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{assessment.problems} problems</span>
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
                  <AssessmentInstructions
                    assessment={{
                      id: assessment.id,
                      title: assessment.title,
                      duration: assessment.duration,
                      problems: assessment.problems
                    }}
                    onStartAssessment={() => handleStartAssessment(assessment.id)}
                  />
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
