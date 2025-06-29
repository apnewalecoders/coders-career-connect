
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InterviewExperience {
  id: number;
  title: string;
  company: string;
  role: string;
  experience: string;
  date: string;
  summary: string;
  rounds: number;
  difficulty: string;
  keyHighlights: string[];
}

interface InterviewCardProps {
  experience: InterviewExperience;
  onReadExperience: (id: number) => void;
}

const InterviewCard = ({ experience, onReadExperience }: InterviewCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "Fresher": return "bg-blue-100 text-blue-800 border-blue-200";
      case "1-2 Years": return "bg-purple-100 text-purple-800 border-purple-200";
      case "3-5 Years": return "bg-orange-100 text-orange-800 border-orange-200";
      case "5+ Years": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-gray-100 hover:border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
              {experience.title}
            </CardTitle>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-brand-red hover:bg-red-600 text-white text-xs font-medium px-3 py-1">
                {experience.company}
              </Badge>
              <Badge variant="outline" className="text-xs font-medium px-3 py-1 border-gray-300">
                {experience.role}
              </Badge>
              <Badge className={`text-xs font-medium px-3 py-1 border ${getExperienceColor(experience.experience)}`}>
                {experience.experience}
              </Badge>
              <Badge className={`text-xs font-medium px-3 py-1 border ${getDifficultyColor(experience.difficulty)}`}>
                {experience.difficulty}
              </Badge>
            </div>
            
            <CardDescription className="text-gray-600 leading-relaxed mb-4">
              {experience.summary}
            </CardDescription>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                {experience.rounds} Rounds
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {experience.date}
              </span>
            </div>
          </div>
          
          <Button
            onClick={() => onReadExperience(experience.id)}
            className="bg-brand-red hover:bg-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 min-w-fit"
          >
            Read Experience
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default InterviewCard;
