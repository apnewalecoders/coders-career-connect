
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AssessmentFilters from "@/components/assessment/AssessmentFilters";
import AssessmentHeader from "@/components/assessment/AssessmentHeader";
import AssessmentGrid from "@/components/assessment/AssessmentGrid";

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <AssessmentHeader filteredCount={filteredAssessments.length} />
        
        <AssessmentFilters onFiltersChange={setFilters} />

        <AssessmentGrid 
          assessments={filteredAssessments}
          onStartAssessment={handleStartAssessment}
        />
      </div>
    </Layout>
  );
};

export default MockAssessment;
