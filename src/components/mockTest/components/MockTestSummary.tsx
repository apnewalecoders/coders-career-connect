
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, Flag } from "lucide-react";
import MockTestTimer from "./MockTestTimer";

interface MockTestSummaryProps {
  timeLeft: number;
  totalQuestions: number;
  answeredCount: number;
  onSubmit: () => void;
}

const MockTestSummary = ({ 
  timeLeft, 
  totalQuestions, 
  answeredCount, 
  onSubmit 
}: MockTestSummaryProps) => {
  const remainingCount = totalQuestions - answeredCount;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Test Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600 font-mono">
            <MockTestTimer timeLeft={timeLeft} />
          </div>
          <div className="text-sm text-gray-500">Time Remaining</div>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Questions:</span>
            <span className="font-bold">{totalQuestions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Answered:</span>
            <span className="font-bold text-green-600">{answeredCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Remaining:</span>
            <span className="font-bold text-red-600">{remainingCount}</span>
          </div>
        </div>

        {/* Submit Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white h-12">
              <Flag className="h-4 w-4 mr-2" />
              Submit Test
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Test?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to submit your test? You have answered {answeredCount} out of {totalQuestions} questions.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Review Again</AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit} className="bg-red-500 hover:bg-red-600">
                Submit Test
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default MockTestSummary;
