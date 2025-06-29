
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import InterviewCard from "./InterviewCard";

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

interface InterviewListProps {
  experiences: InterviewExperience[];
  onReadExperience: (id: number) => void;
  onResetFilters: () => void;
}

const InterviewList = ({ experiences, onReadExperience, onResetFilters }: InterviewListProps) => {
  return (
    <>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">
          {experiences.length} interview experience{experiences.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Interview Experiences Grid */}
      <div className="grid gap-6">
        {experiences.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No experiences found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search terms to find relevant interview experiences.
              </p>
              <Button onClick={onResetFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          experiences.map((experience) => (
            <InterviewCard
              key={experience.id}
              experience={experience}
              onReadExperience={onReadExperience}
            />
          ))
        )}
      </div>
    </>
  );
};

export default InterviewList;
