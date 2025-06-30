
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Building, BookOpen } from "lucide-react";
import AssessmentInstructions from "./AssessmentInstructions";

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

interface AssessmentCardProps {
  assessment: Assessment;
  onStartAssessment: (assessmentId: number) => void;
}

const AssessmentCard = ({ assessment, onStartAssessment }: AssessmentCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-brand-red">
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
          onStartAssessment={() => onStartAssessment(assessment.id)}
        />
      </CardContent>
    </Card>
  );
};

export default AssessmentCard;
