import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Code, Building, Users } from "lucide-react";
import AssessmentInstructions from "@/components/assessment/AssessmentInstructions";
import FullScreenAssessment from "@/components/assessment/FullScreenAssessment";
import AssessmentFilters from "@/components/assessment/AssessmentFilters";

const randomAssessments = [
  {
    id: 1,
    title: "Full Stack Developer Assessment",
    description: "Complete assessment covering frontend, backend, and database concepts with coding problems.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Medium",
    icon: <Code className="h-8 w-8 text-blue-500" />
  },
  {
    id: 2,
    title: "Data Structures Assessment",
    description: "Advanced coding problems focusing on complex data structures and algorithms.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Hard",
    icon: <Code className="h-8 w-8 text-green-500" />
  },
  {
    id: 3,
    title: "System Design Assessment",
    description: "Design scalable systems and solve architectural problems with implementation.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Hard",
    icon: <Code className="h-8 w-8 text-purple-500" />
  }
];

const companyAssessments = [
  {
    id: 4,
    title: "TCS CodeVita Assessment",
    company: "TCS",
    description: "Practice TCS-style coding problems and algorithmic challenges.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Medium",
    icon: <Building className="h-8 w-8 text-blue-600" />
  },
  {
    id: 5,
    title: "Wipro NLTH Assessment",
    company: "Wipro",
    description: "Wipro's National Level Talent Hunt coding assessment simulation.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Medium",
    icon: <Building className="h-8 w-8 text-orange-500" />
  },
  {
    id: 6,
    title: "Google SDE Assessment",
    company: "Google",
    description: "Google-style algorithmic problems focusing on optimization and efficiency.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Hard",
    icon: <Building className="h-8 w-8 text-red-500" />
  },
  {
    id: 7,
    title: "Accenture Coding Test",
    company: "Accenture",
    description: "Accenture's standard coding assessment with practical programming problems.",
    duration: "60 mins",
    problems: 2,
    difficulty: "Easy",
    icon: <Building className="h-8 w-8 text-purple-600" />
  }
];

const MockAssessment = () => {
  const navigate = useNavigate();
  const [activeAssessment, setActiveAssessment] = useState<number | null>(null);
  const [filteredAssessments, setFilteredAssessments] = useState([...randomAssessments, ...companyAssessments]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const handleStartAssessment = (assessmentId: number) => {
    setActiveAssessment(assessmentId);
  };

  const handleExitAssessment = () => {
    setActiveAssessment(null);
  };

  const handleViewDetails = (assessmentId: number) => {
    navigate(`/mock-assessment/${assessmentId}`);
  };

  const handleFilterChange = (filters: { company: string; role: string; topic: string }) => {
    let filtered = [...randomAssessments, ...companyAssessments];
    
    if (filters.company !== "All Companies") {
      filtered = filtered.filter(assessment => 
        'company' in assessment && assessment.company === filters.company
      );
    }
    
    // Add more filter logic here as needed
    setFilteredAssessments(filtered);
  };

  const AssessmentCard = ({ assessment, showCompany = false }: { assessment: any, showCompany?: boolean }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          {assessment.icon}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
            {assessment.difficulty}
          </span>
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">{assessment.title}</CardTitle>
        {showCompany && 'company' in assessment && (
          <div className="text-sm text-brand-red font-medium">{assessment.company}</div>
        )}
        <CardDescription className="text-gray-600 leading-relaxed">
          {assessment.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            <span>{assessment.problems} Problems</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{assessment.duration}</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <AssessmentInstructions 
            assessment={assessment}
            onStartAssessment={() => handleStartAssessment(assessment.id)}
          />
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => handleViewDetails(assessment.id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (activeAssessment) {
    return (
      <FullScreenAssessment 
        assessmentId={activeAssessment}
        onExit={handleExitAssessment}
      />
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mock Assessments</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice with real-world coding assessments. Each assessment includes 2 comprehensive coding problems with integrated compiler and test environment.
          </p>
        </div>

        {/* Filters */}
        <AssessmentFilters onFilterChange={handleFilterChange} />

        {/* Random Assessments Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-brand-red" />
            Random Assessments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.filter(a => a.id <= 3).map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </div>

        {/* Company-wise Assessments Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Building className="h-6 w-6 text-brand-red" />
            Company-wise Assessments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.filter(a => a.id > 3).map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} showCompany={true} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockAssessment;
