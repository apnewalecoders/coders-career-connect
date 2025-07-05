
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Clock, LogOut } from "lucide-react";

interface MockAssessmentHeaderProps {
  assessmentId: string | undefined;
  timeLeft: number;
  onExit: () => void;
}

const MockAssessmentHeader = ({ assessmentId, timeLeft, onExit }: MockAssessmentHeaderProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0 shadow-sm">
      <div className="flex items-center justify-between max-w-full">
        <h1 className="text-lg font-semibold text-gray-900">Mock Assessment #{assessmentId}</h1>
        
        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
          <Clock className="h-5 w-5 text-red-600" />
          <span className="font-mono text-xl font-bold text-red-600">
            {formatTime(timeLeft)}
          </span>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Exit Assessment?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to exit? Your progress will be saved.
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

export default MockAssessmentHeader;
