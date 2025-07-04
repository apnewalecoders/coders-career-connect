
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";
import AssessmentTimer from "./AssessmentTimer";

interface AssessmentHeaderProps {
  assessmentId: number;
  timeLeft: number;
  onExit: () => void;
}

const AssessmentHeader = ({ assessmentId, timeLeft, onExit }: AssessmentHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Assessment Info */}
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">Mock Assessment #{assessmentId}</h1>
        </div>

        {/* Center: Timer */}
        <AssessmentTimer timeLeft={timeLeft} />

        {/* Right: Exit Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Exit Assessment?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to exit the assessment? Your progress will be saved, but you won't be able to continue this session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onExit} className="bg-red-600 hover:bg-red-700">
                Exit Assessment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AssessmentHeader;
