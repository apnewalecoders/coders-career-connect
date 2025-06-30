
import { Target } from "lucide-react";
import AssessmentCard from "./AssessmentCard";

interface Assessment {
  id: number;
  title: string;
  description: string;
  duration: string;
  problems: number;
  difficulty: string;
  company: string;
  type: string;
  topic: string;
  participants: number;
}

interface AssessmentGridProps {
  assessments: Assessment[];
  onStartAssessment: (assessmentId: number) => void;
}

const AssessmentGrid = ({ assessments, onStartAssessment }: AssessmentGridProps) => {
  if (assessments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Target className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No assessments found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assessments.map((assessment) => (
        <AssessmentCard
          key={assessment.id}
          assessment={assessment}
          onStartAssessment={onStartAssessment}
        />
      ))}
    </div>
  );
};

export default AssessmentGrid;
